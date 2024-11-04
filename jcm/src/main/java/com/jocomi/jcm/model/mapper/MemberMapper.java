package com.jocomi.jcm.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.jocomi.jcm.member.vo.Member;

@Mapper
public interface MemberMapper {
	Member loginMember(String id, String password);	// 완료

}
