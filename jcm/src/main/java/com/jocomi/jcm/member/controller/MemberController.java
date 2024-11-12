package com.jocomi.jcm.member.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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

import com.google.gson.Gson;
import com.jocomi.jcm.model.vo.Member;
import com.jocomi.jcm.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
public class MemberController {

    private static final String DEFAULT_PROFILE_IMAGE_PATH = "/img/TEST.JPG";
    private final MemberService mService;

    @Autowired
    public MemberController(MemberService mService) {
        this.mService = mService;
    }

    @ResponseBody
    @PostMapping(value = "/login", produces = "application/json;charset=UTF-8")
    public String loginMember(@RequestBody Member member) {
        Member loginMember = mService.loginMember(member);
        log.info("Login Result: {}", loginMember);
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

        if (member.getPImg() == null || member.getPImg().isEmpty()) {
            member.setPImg(DEFAULT_PROFILE_IMAGE_PATH);
        }

        int result = mService.registerMember(member);
        return result == 1 ? new Gson().toJson("회원가입에 성공했습니다.") : new Gson().toJson("회원가입에 실패했습니다.");
    }

    @ResponseBody
    @GetMapping(value = "/profile", produces = "application/json;charset=UTF-8")
    public String profile(@RequestParam("memberId") String memberId) {
        Member member = mService.memberProfile(memberId);
        if (member != null && (member.getPImg() == null || member.getPImg().isEmpty())) {
            member.setPImg(DEFAULT_PROFILE_IMAGE_PATH);
        }
        return new Gson().toJson(member);
    }

    @ResponseBody
    @PostMapping(value = "/uploadProfileImage", produces = "application/json;charset=UTF-8")
    public String uploadProfileImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("memberId") String memberId) {

        String frontendUploadDir = "C:\\Users\\user1\\Desktop\\새 폴더\\public\\img\\";  // 프론트엔드 서버의 실제 경로
        String fileName = System.currentTimeMillis() + file.getOriginalFilename();
        String newPImgPath = "/img/" + fileName;  // 프론트엔드에서 접근할 수 있는 경로

        try {
            Path frontendPath = Paths.get(frontendUploadDir);
            if (!Files.exists(frontendPath)) {
                Files.createDirectories(frontendPath);
            }

            Path frontendFilePath = frontendPath.resolve(fileName);
            file.transferTo(frontendFilePath.toFile());

            Member member = mService.memberProfile(memberId);
            if (member != null) {
                member.setPImg(newPImgPath);
                mService.editProfile(member);
                return new Gson().toJson(newPImgPath);  // 프론트엔드가 접근할 수 있는 상대 경로 반환
            } else {
                return new Gson().toJson("member-not-found");
            }
        } catch (IOException e) {
            log.error("IOException during file upload: ", e);
            return new Gson().toJson("fail");
        }
    }


    @PostMapping("/editProfile")
    @ResponseBody
    public ResponseEntity<?> editProfile(@RequestBody Member member) {
        try {
            Member currentMember = mService.memberProfile(member.getMemberId());
            if (member.getPImg() == null || member.getPImg().isEmpty()) {
                member.setPImg(currentMember.getPImg());
            }

            int result = mService.editProfile(member);
            if (result > 0) {
                Member updatedMember = mService.memberProfile(member.getMemberId());
                return ResponseEntity.ok(updatedMember);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 업데이트 실패");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }
}
