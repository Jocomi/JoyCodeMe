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

	// ID 중복 체크 메서드
    public int checkUserById(String id) {
        return mMapper.checkUserById(id);
    }

    // 이메일 중복 체크 메서드
    public int checkUserByEmail(String email) {
        return mMapper.checkUserByEmail(email);
    }

    // 전화번호 중복 체크 메서드
    public int checkUserByPhone(String phone) {
        return mMapper.checkUserByPhone(phone);
    }

	// 회원 ID 조회 메서드
	public int selectId(Member member) {
		return mMapper.selectId(member.getMemberId());
	}

	// 회원 정보 조회 메서드
	public Member memberProfile(String memberId) {
		return mMapper.memberProfile(memberId);
	}

	// 회원 정보 수정 메서드
	public int editProfile(Member member) {
		return mMapper.editProfile(member);
	}
	public int updateProfileImage(String memberId, String imagePath) {
	    return mMapper.updateProfileImage(memberId, imagePath);
	}

}
