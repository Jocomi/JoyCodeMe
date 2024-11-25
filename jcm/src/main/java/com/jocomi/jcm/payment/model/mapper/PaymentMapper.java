package com.jocomi.jcm.payment.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.jocomi.jcm.payment.model.vo.Payment;

@Mapper
public interface PaymentMapper {

    // 결제 정보 저장 메서드
    int insertPayment(Payment payment);

	List<Payment> getPaymentsByMemberId(String memberId);

	Payment selectPayment(String memberId);
	
	
}
