package com.jocomi.jcm.service;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.model.mapper.MemberMapper;
import com.jocomi.jcm.model.vo.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberMapper mMapper;

    public Member loginMember(Member member) {
    	
        return mMapper.loginMember(member);
    }

    // 회원가입 기능 유지 (필요 시 사용 가능)
    public int registerMember(Member member) {

         return mMapper.insertMember(member);
    
    }
    public int selectId(Member member) {
    	return mMapper.selectId(member.getMemberId());
    }
    
    public Member memberProfile(String memberId) {
        return mMapper.memberProfile(memberId);
    }
}
