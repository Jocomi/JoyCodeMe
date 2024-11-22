package com.jocomi.jcm.model.vo;

import lombok.Data;

@Data
public class Member {
    private String memberId;
    private String memberPwd; 
    private String memberName;
    private String email;
    private String phone;
    private String birth;
    private String address;
    private String status = "Y"; // 기본값 설정
    private String pImg; // 기본값 설정
    private boolean SocialLogin;
    // 추가된 결제 정보
    private String payProduct;   // 결제 상품
    private String payTime;      // 결제 시간
    private int payPrice;
    private String payStatus;
}