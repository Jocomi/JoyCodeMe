package com.jocomi.jcm.admin.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jocomi.jcm.admin.model.mapper.AdminMapper;
import com.jocomi.jcm.model.vo.Member;

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
    
    // 등급별 고객 데이터 반환
    public Map<String, Integer> getConsumerDistribution() {
        Map<String, Object> rawData = adminMapper.calculateUserVIPDistribution();
        // BigDecimal 데이터를 Integer로 변환
        Map<String, Integer> processedData = new HashMap<>();
        processedData.put("VIP1", ((BigDecimal) rawData.get("VIP1")).intValue());
        processedData.put("VIP2", ((BigDecimal) rawData.get("VIP2")).intValue());
        processedData.put("VIP3", ((BigDecimal) rawData.get("VIP3")).intValue());
        processedData.put("NOMAL", ((BigDecimal) rawData.get("NOMAL")).intValue());
        return processedData;
    }
    
    // 모든 회원 정보 조회
    public List<Member> getAllMembers() {
        return adminMapper.getAllMembers();
    }

    // 회원 정보 수정
    public int updateMember(Member updatedMember) {
        return adminMapper.updateMemberInfo(updatedMember);
    }

    // 회원 비활성화 (STATUS = 'N')
    public int deactivateMember(String memberId) {
        return adminMapper.updateMemberStatus(memberId, "N");
    }

}

