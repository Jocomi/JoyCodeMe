package com.jocomi.jcm.board.model.vo;

import lombok.Data;

@Data
public class EnquiryBoard {
	   private int postNo;
	    private String memberId;
	    private String postTitle;
	    private String postContent;
	    private String imgFile;
	    private	String postTime;
	    private int countView;
	    private int recommend;
	    private String privateEnquiry;
	    private String status;
}
