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
    private String pImg = "TEST.IMG"; // 기본값 설정
}
