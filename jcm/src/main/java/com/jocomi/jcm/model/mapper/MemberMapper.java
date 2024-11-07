package com.jocomi.jcm.model.mapper;

import com.jocomi.jcm.member.vo.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    Member loginMember(String memberId, String memberPwd);
    
    int insertMember(Member member); // 회원가입 메서드 유지
    
	int selectId(String memberId);
}
