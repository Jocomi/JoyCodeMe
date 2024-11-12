package com.jocomi.jcm.member.controller;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.util.Base64;
import java.util.Map;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.jocomi.jcm.model.vo.Member;
import com.jocomi.jcm.service.MemberService;

import jakarta.servlet.ServletContext;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
public class MemberController {

    private final MemberService mService;
    private final ServletContext servletContext;

    @Autowired
    public MemberController(MemberService mService, ServletContext servletContext) {
        this.mService = mService;
        this.servletContext = servletContext;
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

        if (mService.checkUserById(member.getMemberId()) > 0) {
            return new Gson().toJson("중복된 아이디 입니다.");
        }

        if (mService.checkUserByEmail(member.getEmail()) > 0) {
            return new Gson().toJson("중복된 이메일 입니다.");
        }

        if (mService.checkUserByPhone(member.getPhone()) > 0) {    
            return new Gson().toJson("중복된 전화번호 입니다.");
        }

        int result = mService.registerMember(member);
        return result == 1 ? new Gson().toJson("회원가입에 성공했습니다.") : new Gson().toJson("회원가입에 실패했습니다.");
    }

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
//        if (member.getPImg() == null || member.getPImg().isEmpty()) {
//            member.setPImg("/img/TEST.JPG");
//        }
        return new Gson().toJson(member);
    }

    @PostMapping("/uploadProfileImage")
    public ResponseEntity<String> uploadProfileImage(@RequestParam("file") MultipartFile file,
                                                     @RequestParam("memberId") String memberId) {
        try {
            // 파일 이름 생성
            String fileName = memberId + "_" + file.getOriginalFilename();

            // Spring 서버의 webapp/img 디렉토리에 이미지 저장 경로 설정
            String uploadDir = servletContext.getRealPath("/img");
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 이미지 파일 저장
            File targetFile = new File(directory, fileName);
            file.transferTo(targetFile);

            // DB에 저장할 경로 값 반환
            String imagePath = "/img/" + fileName;
            int updateResult = mService.updateProfileImage(memberId, imagePath);

            if (updateResult > 0) {
                return ResponseEntity.ok(fileName);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("DB 업데이트 실패");
            }

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
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
    
    @PostMapping(value = "/api/auth/google", produces = "application/json;charset=UTF-8")
    public String googleLogin(@RequestBody Map<String, String> payload) {
        try {
            String token = payload.get("token");
            String[] splitToken = token.split("\\.");
            String payloadJson = new String(Base64.getUrlDecoder().decode(splitToken[1]));
            JSONObject claims = new JSONObject(payloadJson);

            Member member = new Member();
            member.setMemberId(claims.getString("sub"));
            member.setEmail(claims.getString("email"));
            member.setMemberName(claims.optString("name", "Unknown"));
            member.setPImg(claims.optString("picture", "/img/default-profile.png"));
            member.setMemberPwd("default_password"); // 기본 비밀번호 설정

            // 전화번호 확인 및 기본값 설정
            String phoneNumber = claims.optString("phone_number", null);
            if (phoneNumber == null) {
                phoneNumber = "000-0000-0000"; // 기본 전화번호 설정
            }
            member.setPhone(phoneNumber);

            if (mService.checkUserById(member.getMemberId()) == 0) {
                mService.registerMember(member); // 신규 사용자 등록
            }

            return new Gson().toJson(member);
        } catch (Exception e) {
            log.error("Google login error:", e);
            return new Gson().toJson("Google 로그인에 실패했습니다.");
        }
    }
}
