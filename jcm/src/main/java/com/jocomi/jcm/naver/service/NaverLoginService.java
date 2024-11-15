package com.jocomi.jcm.naver.service;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

@Service
public class NaverLoginService {

    public JSONObject getUserProfile(String accessToken) {
        String url = "https://openapi.naver.com/v1/nid/me";
        
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        
        HttpEntity<String> entity = new HttpEntity<>(headers);

        
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        
        return new JSONObject(response.getBody()).getJSONObject("response");
    }
}
