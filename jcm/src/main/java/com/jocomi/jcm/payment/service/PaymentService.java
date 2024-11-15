package com.jocomi.jcm.payment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jocomi.jcm.payment.mapper.PaymentMapper;
import com.jocomi.jcm.payment.model.Payment;

@Service
public class PaymentService {

    @Autowired
    private PaymentMapper paymentMapper;

    // 결제 처리 및 DB 저장
    public boolean processPayment(Payment payment) {
        try {
            // DB에 결제 정보를 저장합니다.
            int result = paymentMapper.insertPayment(payment);
            return result > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
