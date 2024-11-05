package com.jocomi.jcm.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.jocomi.jcm.member.vo.Member;
import com.jocomi.jcm.service.MemberService;

@CrossOrigin(origins = "http://localhost:3000")
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
        if (loginMember != null) {
            return new Gson().toJson("로그인 성공");
        } else {
            return new Gson().toJson("로그인 실패");
        }
    }

    // 회원가입 기능 비활성화
    @PostMapping(value = "/signup", produces = "application/json;charset=UTF-8")
    public String signupMember(@RequestBody Member member) {
        return new Gson().toJson("회원가입 기능은 현재 사용할 수 없습니다.");
    }
}
