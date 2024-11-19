package com.jocomi.jcm.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jocomi.jcm.admin.service.AdminService;

@CrossOrigin(origins = "*")
@RestController
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/api/admin/total-users")
    public ResponseEntity<Integer> getTotalUsers() {
        int totalUsers = adminService.getTotalUsers();
        return ResponseEntity.ok(totalUsers);
    }
    
    // 총 수익 반환
    @GetMapping("/api/admin/total-earnings")
    public ResponseEntity<Integer> getTotalEarnings() {
        int totalEarnings = adminService.getTotalEarnings();
        return ResponseEntity.ok(totalEarnings);
    }

    // 총 구매자 수 반환
    @GetMapping("/api/admin/total-consumers")
    public ResponseEntity<Integer> getTotalConsumers() {
        int totalConsumers = adminService.getTotalConsumers();
        return ResponseEntity.ok(totalConsumers);
    }

}
