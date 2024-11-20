package com.jocomi.jcm.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jocomi.jcm.admin.service.AdminService;
import com.jocomi.jcm.model.vo.Member;

@CrossOrigin(origins = "*")
@RequestMapping("/api/admin")
@RestController
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/total-users")
    public ResponseEntity<Integer> getTotalUsers() {
        int totalUsers = adminService.getTotalUsers();
        return ResponseEntity.ok(totalUsers);
    }
    
    // 총 수익 반환
    @GetMapping("/total-earnings")
    public ResponseEntity<Integer> getTotalEarnings() {
        int totalEarnings = adminService.getTotalEarnings();
        return ResponseEntity.ok(totalEarnings);
    }

    // 총 구매자 수 반환
    @GetMapping("/total-consumers")
    public ResponseEntity<Integer> getTotalConsumers() {
        int totalConsumers = adminService.getTotalConsumers();
        return ResponseEntity.ok(totalConsumers);
    }
    
    // 월별 수익 데이터 반환
    @GetMapping("/monthly-earnings")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyEarnings() {
        List<Map<String, Object>> monthlyEarnings = adminService.getMonthlyEarnings();
        return ResponseEntity.ok(monthlyEarnings);
    }
    
    // 모든 고객 정보 조회
    @GetMapping("/customers")
    public ResponseEntity<List<Member>> getAllCustomers() {
        try {
            List<Member> customers = adminService.getAllMembers();
            return ResponseEntity.ok(customers);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    // 고객 수정
    @PutMapping("/customers/{memberId}")
    public ResponseEntity<String> updateCustomer(@PathVariable String memberId, @RequestBody Member updatedMember) {
        try {
            updatedMember.setMemberId(memberId);
            int result = adminService.updateMember(updatedMember);
            if (result > 0) {
                return ResponseEntity.ok("회원 정보가 수정되었습니다.");
            } else {
                return ResponseEntity.badRequest().body("수정 실패.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("오류 발생.");
        }
    }

    // 고객 삭제 (STATUS = 'N')
    @PatchMapping("/customers/{memberId}/deactivate")
    public ResponseEntity<String> deactivateCustomer(@PathVariable String memberId) {
        try {
            int result = adminService.deactivateMember(memberId);
            if (result > 0) {
                return ResponseEntity.ok("회원이 비활성화되었습니다.");
            } else {
                return ResponseEntity.badRequest().body("변경 실패.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("오류 발생.");
        }
    }

}