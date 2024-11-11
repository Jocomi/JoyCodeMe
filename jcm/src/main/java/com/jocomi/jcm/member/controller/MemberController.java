package com.jocomi.jcm.member.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.jocomi.jcm.model.vo.Member;
import com.jocomi.jcm.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
public class MemberController {

	private final MemberService mService;

	@Autowired
	public MemberController(MemberService mService) {
		this.mService = mService;
	}

	@ResponseBody
	@PostMapping(value = "/login", produces = "application/json;charset=UTF-8")
	public String loginMember(@RequestBody Member member) {
		Member loginMember = mService.loginMember(member);
		return new Gson().toJson(loginMember);
	}

	@ResponseBody
	@PostMapping(value = "/signup", produces = "application/json;charset=UTF-8")
	public String signupMember(@RequestBody Member member) {
	    log.info("Received signup data: {}", member);

	    // ID 중복 체크
	    if (mService.checkUserById(member.getMemberId()) > 0) {
	        return new Gson().toJson("중복된 아이디 입니다.");
	    }

	    // 이메일 중복 체크
	    if (mService.checkUserByEmail(member.getEmail()) > 0) {
	        return new Gson().toJson("중복된 이메일 입니다.");
	    }

	    // 전화번호 중복 체크
	    if (mService.checkUserByPhone(member.getPhone()) > 0) {	
	        return new Gson().toJson("중복된 전화번호 입니다.");
	    }

	    // 중복이 없으면 회원가입 진행
	    int result = mService.registerMember(member);
	    return result == 1 ? new Gson().toJson("회원가입에 성공했습니다.") : new Gson().toJson("회원가입에 실패했습니다.");
	}

	// 필드별 중복 확인 메서드
	@ResponseBody
	@PostMapping(value = "/checkUser", produces = "application/json;charset=UTF-8")
	public String checkUser(@RequestBody Map<String, String> checkData) {
	    String field = checkData.get("field");
	    String value = checkData.get("value");

	    int count = 0;
	    switch (field) {
	        case "id":
	            count = mService.checkUserById(value);
	            break;
	        case "email":
	            count = mService.checkUserByEmail(value);
	            break;
	        case "phone":
	            count = mService.checkUserByPhone(value);
	            break;
	        default:
	            throw new IllegalArgumentException("Invalid field: " + field);
	    }
	    return new Gson().toJson(count > 0); // true: 중복, false: 중복 아님
	}

	@ResponseBody
	@GetMapping(value = "/profile", produces = "application/json;charset=UTF-8")
	public String profile(@RequestParam("memberId") String memberId) {
		Member member = mService.memberProfile(memberId);
		if (member.getPImg() == null || member.getPImg().isEmpty()) {
			member.setPImg("/img/TEST.JPG");
		}
		return new Gson().toJson(member);
	}

	@ResponseBody
	@PostMapping(value = "/uploadProfileImage", produces = "application/json;charset=UTF-8")
	public String uploadProfileImage(
	        @RequestParam("file") MultipartFile file,
	        @RequestParam("memberId") String memberId) {

	    String frontendUploadDir = "C:\\Users\\user1\\Desktop\\새 폴더\\public\\img\\";
	    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	    try {
	        Path frontendPath = Paths.get(frontendUploadDir);
	        if (!Files.exists(frontendPath)) {
	            Files.createDirectories(frontendPath);
	        }

	        Path frontendFilePath = frontendPath.resolve(fileName);
	        file.transferTo(frontendFilePath.toFile());

	        Member member = mService.memberProfile(memberId);
	        if (member != null) {
	            member.setPImg(fileName);
	            int updateResult = mService.editProfile(member);

	            if (updateResult > 0) {
	                return new Gson().toJson(fileName);
	            } else {
	                log.error("DB 업데이트 실패");
	                return new Gson().toJson("db-fail");
	            }
	        } else {
	            return new Gson().toJson("member-not-found");
	        }
	    } catch (IOException e) {
	        log.error("IOException during file upload: ", e);
	        return new Gson().toJson("fail");
	    } catch (Exception e) {
	        log.error("Unexpected error during file upload: ", e);
	        return new Gson().toJson("fail");
	    }
	}

	@ResponseBody
	@PostMapping(value = "/editProfile", produces = "application/json;charset=UTF-8")
	public String editProfile(@RequestBody Member member) {
		int result = mService.editProfile(member);
		if (result > 0) {
			Member updatedMember = mService.memberProfile(member.getMemberId());
			return new Gson().toJson(updatedMember);
		} else {
			return new Gson().toJson("프로필 변경에 실패했습니다.");
		}
	}
}
