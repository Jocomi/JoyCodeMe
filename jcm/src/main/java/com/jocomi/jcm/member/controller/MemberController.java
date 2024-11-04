package com.jocomi.jcm.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.jocomi.jcm.member.vo.Member;
import com.jocomi.jcm.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {
	
	private final MemberService mService;
	
	@Autowired 
	public MemberController(MemberService mService) {
		this.mService = mService;
	}
	
	@ResponseBody
	@PostMapping(value="/login", produces="application/json;charset=UTF-8")
	public String loginMember(Member member) {
		Member loginMember = mService.loginMember(member);
		return new Gson().toJson(loginMember);
	}
}
