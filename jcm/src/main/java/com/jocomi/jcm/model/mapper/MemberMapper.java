package com.jocomi.jcm.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.jocomi.jcm.model.vo.Member;

@Mapper
public interface MemberMapper {
	Member loginMember(Member member);

	int insertMember(Member member);

	int selectId(String memberId);

    // 회원 정보 조회 메서드
    Member memberProfile(String memberId);
}
