package com.jocomi.jcm.service;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.member.vo.Member;
import com.jocomi.jcm.model.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberMapper mapper;
	
	public Member loginMember(Member member) {
		return mapper.loginMember(member.getId(), member.getPassword());
		// 완료
	}
}
