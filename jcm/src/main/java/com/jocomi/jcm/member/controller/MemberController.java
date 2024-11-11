package com.jocomi.jcm.member.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

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
        if (mService.selectId(member) == 0) {
            int result = mService.registerMember(member);
            return result == 1 ? new Gson().toJson("회원가입에 성공했습니다.") : new Gson().toJson("회원가입에 실패 했습니다.");
        } else {
            return new Gson().toJson("중복된 아이디 입니다.");
        }
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

	// 프로필 이미지 업로드
	// MemberController.java 내의 uploadProfileImage 메서드 수정
	@ResponseBody
	@PostMapping(value = "/uploadProfileImage", produces = "application/json;charset=UTF-8")
	public String uploadProfileImage(
	        @RequestParam("file") MultipartFile file,
	        @RequestParam("memberId") String memberId) {

	    // 프론트엔드의 실제 파일 저장 경로
	    String frontendUploadDir = "C:\\Users\\user1\\Desktop\\새 폴더\\public\\img\\";
	    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	    try {
	        // 프론트엔드 경로가 있는지 확인하고 없으면 생성
	        Path frontendPath = Paths.get(frontendUploadDir);
	        if (!Files.exists(frontendPath)) {
	            Files.createDirectories(frontendPath);
	        }

	        // 파일을 프론트엔드 경로에 저장
	        Path frontendFilePath = frontendPath.resolve(fileName);
	        file.transferTo(frontendFilePath.toFile());

	        // DB에 파일명만 저장
	        Member member = mService.memberProfile(memberId); // 기존 프로필 데이터를 가져와서 사용
	        if (member != null) {
	            member.setPImg(fileName); // 파일명만 업데이트
	            int updateResult = mService.editProfile(member);

	            if (updateResult > 0) {
	                return new Gson().toJson(fileName); // 프론트에서 접근 가능한 파일명 반환
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
		int result = mService.editProfile(member); // DB 업데이트
		if (result > 0) {
			Member updatedMember = mService.memberProfile(member.getMemberId());
			return new Gson().toJson(updatedMember); // 업데이트된 사용자 정보 반환
		} else {
			return new Gson().toJson("프로필 변경에 실패했습니다.");
		}
	}

}
