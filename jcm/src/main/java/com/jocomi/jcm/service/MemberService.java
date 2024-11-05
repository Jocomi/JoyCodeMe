package com.jocomi.jcm.service;

import org.springframework.stereotype.Service;
import com.jocomi.jcm.member.vo.Member;
import com.jocomi.jcm.model.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberMapper mMapper;

    public Member loginMember(Member member) {
        return mMapper.loginMember(member.getMemberId(), member.getMemberPwd());
    }

    // 회원가입 기능 유지 (필요 시 사용 가능)
    public int registerMember(Member member) {

         return mMapper.insertMember(member);
    
    }
    public int selectId(Member member) {
    	return mMapper.selectId(member.getMemberId());
    }
}
