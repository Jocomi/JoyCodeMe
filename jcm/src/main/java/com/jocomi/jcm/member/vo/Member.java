package com.jocomi.jcm.member.vo;

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
    private String status;
    private String pImg;
}
