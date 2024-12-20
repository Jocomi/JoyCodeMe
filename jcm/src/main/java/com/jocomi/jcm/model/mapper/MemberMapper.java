package com.jocomi.jcm.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.jocomi.jcm.model.vo.Member;

@Mapper
public interface MemberMapper {
    
    // 로그인 메서드
    Member loginMember(Member member);

    // 회원가입 메서드
    int insertMember(Member member);

    // 회원 ID 확인 메서드
    int selectId(String memberId);

    // 회원 정보 조회 메서드
    Member memberProfile(String memberId);

    // ID 중복 체크 메서드
    int checkUserById(@Param("value") String id);

    // 이메일 중복 체크 메서드
    int checkUserByEmail(@Param("value") String email);

    // 전화번호 중복 체크 메서드
    int checkUserByPhone(@Param("value") String phone);

    // 회원 정보 수정 메서드
    int editProfile(Member member);

    // 프로필 이미지 경로 업데이트 메서드
    int updateProfileImage(@Param("memberId") String memberId, @Param("imagePath") String imagePath);
    
    int updatePassword(Member member);

	int insertNaverMember(Member member);

	int selectNaverMember(Member member);

	int editNaverProfile(Member member);

	Member getLatestPayProduct(String memberId); // 반환 타입 수정
	
	int setPassword(String memberId, String memberPwd);

	int setPassword(Map<String, String> of);

	String findIdByEmailAndPhone(Map<String, String> of);

}
