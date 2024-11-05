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
        return mapper.loginMember(member.getMemberId(), member.getMemberPwd());
    }

    // 회원가입 기능 유지 (필요 시 사용 가능)
    public boolean registerMember(Member member) {
        try {
            mapper.insertMember(member);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
