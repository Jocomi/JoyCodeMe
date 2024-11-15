package com.jocomi.jcm.naver.response;

import com.jocomi.jcm.naver.model.vo.NaverProfile;
import lombok.Data;

@Data
public class NaverProfileResponse {
    private String resultcode;  // Response code
    private String message;     // Message from Naver API
    private NaverProfile response; // The profile data
}
