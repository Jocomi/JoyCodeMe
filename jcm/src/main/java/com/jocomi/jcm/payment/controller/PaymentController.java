package com.jocomi.jcm.payment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jocomi.jcm.payment.model.vo.Payment;
import com.jocomi.jcm.payment.service.PaymentService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // 결제 성공 시 호출되는 엔드포인트
    @PostMapping("/success")
    public ResponseEntity<String> handlePaymentSuccess(@RequestBody Payment payment) {
        boolean isProcessed = paymentService.processPayment(payment);
        if (isProcessed) {
            return ResponseEntity.ok("Payment processed successfully");
        } else {
            return ResponseEntity.status(500).body("Payment processing failed");
        }
    }
    

    @GetMapping("/history")
    public ResponseEntity<List<Payment>> getPaymentsByMemberId(String memberId) {
        List<Payment> payments = paymentService.getPaymentsByMemberId(memberId);
        return ResponseEntity.ok(payments);
    }

}
