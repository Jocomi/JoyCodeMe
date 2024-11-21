package com.jocomi.jcm.payment.model.vo;

import lombok.Data;
import java.util.Date;

@Data
public class Payment {
    private String payId;
    private String memberId;
    private String payMethod;
    private String payProduct;
    private Integer payPrice;
    private Date payTime;
    private String payStatus;
}
