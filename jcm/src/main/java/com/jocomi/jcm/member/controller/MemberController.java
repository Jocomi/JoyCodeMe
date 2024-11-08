package com.jocomi.jcm.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.jocomi.jcm.model.vo.Member;
import com.jocomi.jcm.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
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

		return new Gson().toJson(loginMember);

	}

	// 회원가입 기능 비활성화

	@PostMapping(value = "/signup", produces = "application/json;charset=UTF-8")
	public String signupMember(@RequestBody Member member) {

		log.info("data --> {}", member);
		System.out.println(mService.selectId(member));
		if (mService.selectId(member) == 0) {
			int result = mService.registerMember(member);

			if (result == 1) {
				return new Gson().toJson("회원가입에 성공했습니다.");
			} else {

			}
			return new Gson().toJson("회원가입에 실패 했습니다.");
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

}
