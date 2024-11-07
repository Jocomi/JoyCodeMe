package com.jocomi.jcm.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.jocomi.jcm.model.vo.Member;

@Mapper
public interface MemberMapper {
    Member loginMember(Member member);
    
    int insertMember(Member member); // 회원가입 메서드 유지
    
	int selectId(String memberId);
}
