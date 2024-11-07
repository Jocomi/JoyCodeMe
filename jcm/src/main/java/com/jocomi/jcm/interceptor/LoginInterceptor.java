package com.jocomi.jcm.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        
        HttpSession session = request.getSession();

        // 세션에 "user" 속성이 있는지 확인
        if (session.getAttribute("user") != null) {
            return true;  // 사용자 인증이 되었으므로 요청 계속 진행
        } else {
            response.sendRedirect(request.getContextPath());  // 메인 페이지로 리다이렉트
            return false;  // 요청 중단
        }
    }
}

