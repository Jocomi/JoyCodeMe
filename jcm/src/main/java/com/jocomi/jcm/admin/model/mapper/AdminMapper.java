package com.jocomi.jcm.admin.model.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper {
    // STATUS가 'Y' 또는 'A'인 회원 수 계산
    int countMembersWithStatus();
    
    // 총 수익 계산
    int calculateTotalEarnings();

    // 총 구매자 수 계산
    int calculateTotalConsumers();
}
