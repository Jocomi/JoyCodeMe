package com.jocomi.jcm.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public int registerMember(Member member) {
        return mMapper.insertMember(member);
    }

    public int checkUserById(String id) {
        return mMapper.checkUserById(id);
    }

    public int checkUserByEmail(String email) {
        return mMapper.checkUserByEmail(email);
    }

    public int checkUserByPhone(String phone) {
        return mMapper.checkUserByPhone(phone);
    }

    public Member memberProfile(String memberId) {
        return mMapper.memberProfile(memberId);
    }

    @Transactional
    public int editProfile(Member member) {
        return mMapper.editProfile(member);
    }
}

