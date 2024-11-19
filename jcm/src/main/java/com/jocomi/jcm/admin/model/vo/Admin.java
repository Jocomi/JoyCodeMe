package com.jocomi.jcm.admin.model.vo;

import lombok.Data;

@Data
public class Admin {
    private String memberId; // 회원 ID
    private String status;   // 회원 상태 (Y, A 등)
}
