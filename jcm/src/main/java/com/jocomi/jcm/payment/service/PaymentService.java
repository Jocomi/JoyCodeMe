package com.jocomi.jcm.payment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jocomi.jcm.payment.model.mapper.PaymentMapper;
import com.jocomi.jcm.payment.model.vo.Payment;

@Service
public class PaymentService {

    @Autowired
    private PaymentMapper paymentMapper;

    // 특정 사용자(memberId)의 결제 내역 가져오기
    public List<Payment> getPaymentsByMemberId(String memberId) {
        return paymentMapper.getPaymentsByMemberId(memberId);
    }

    // 결제 처리 및 DB 저장
    public boolean processPayment(Payment payment) {
        try {
            int result = paymentMapper.insertPayment(payment);
            return result > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

	public List<Payment> selectPayment(String memberId) {
		List<Payment> payment = paymentMapper.selectPayment(memberId);
		return payment;
	}
}
