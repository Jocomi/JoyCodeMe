package com.jocomi.jcm.naver.model.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class NaverProfile {
    private String id;             // 네이버 사용자 고유 ID
    private String email;          // 이메일
    private String name;           // 이름
    private String mobile;         // 전화번호
    private String profile_image;  // 프로필 이미지 URL
}