package com.jocomi.jcm.ai.model.vo;

import lombok.Data;

@Data
public class AI {
	private int historyNo;
    private String memberId; 
    private String request;
    private String usedFunction;
    private String historyTime;
    private String status;
}
