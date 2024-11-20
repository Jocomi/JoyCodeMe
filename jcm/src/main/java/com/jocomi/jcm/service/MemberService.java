package com.jocomi.jcm.service;


import java.util.Map;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.model.mapper.MemberMapper;
import com.jocomi.jcm.model.vo.Member;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberMapper mMapper;
	private final HttpSession session;

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
	
	public int registerNaverMember(Member member) {
		return mMapper.insertNaverMember(member);
	}

	public int editNaverProfile(Member member) {
		return mMapper.editNaverProfile(member);
	}
	
	// 비밀번호 변경
	public String changePassword(String memberId, String currentPwd, String newPwd) {
	    Member member = mMapper.memberProfile(memberId); // 회원 정보 조회
	    if (member == null || !PasswordUtils.checkPassword(currentPwd, member.getMemberPwd())) {
	        return "현재 비밀번호가 틀렸습니다."; // 비밀번호가 틀린 경우
	    }

	    // 새로운 비밀번호 암호화 후 업데이트
	    member.setMemberPwd(PasswordUtils.hashPassword(newPwd));
	    int result = mMapper.updatePassword(member);
	    return result > 0 ? "비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요." : "비밀번호 변경에 실패했습니다.";
	}

	
	public Member getLatestPayProduct(String memberId) {
	    return mMapper.getLatestPayProduct(memberId);
	}
	
	public String findId(String email, String phone) {
	    return mMapper.findIdByEmailAndPhone(Map.of("email", email, "phone", phone));
	}

	public String resetPassword(String memberId, String newPassword) {
	    // 비밀번호 암호화
	    String hashedPassword = PasswordUtils.hashPassword(newPassword);

	    // DB 업데이트 호출
	    int result = mMapper.resetPassword(Map.of("memberId", memberId, "memberPwd", hashedPassword));
	    return result > 0 ? "비밀번호가 성공적으로 변경되었습니다." : "비밀번호 변경에 실패했습니다.";
	}

	



}
