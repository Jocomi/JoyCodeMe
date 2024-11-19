package com.jocomi.jcm.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jocomi.jcm.admin.model.mapper.AdminMapper;

@Service
public class AdminService {

    private final AdminMapper adminMapper;

    @Autowired
    public AdminService(AdminMapper adminMapper) {
        this.adminMapper = adminMapper;
    }

    // 총 유저 수 반환
    public int getTotalUsers() {
        return adminMapper.countMembersWithStatus();
    }

    // 총 수익 반환
    public int getTotalEarnings() {
        return adminMapper.calculateTotalEarnings();
    }

    // 총 구매자 수 반환
    public int getTotalConsumers() {
        return adminMapper.calculateTotalConsumers();
    }
    
    // 월별 수익 데이터 반환
    public List<Map<String, Object>> getMonthlyEarnings() {
        return adminMapper.getMonthlyEarnings();
    }
}

