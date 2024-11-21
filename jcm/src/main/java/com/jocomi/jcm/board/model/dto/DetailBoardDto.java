package com.jocomi.jcm.board.model.dto;

import java.util.List;

import lombok.Data;

@Data
public class DetailBoardDto {
	   	private int postNo;
	    private String memberId;
	    private String postTitle;
	    private String postContent;
	    private String postTime;
	    private int countView;
	    private String status;
	    private int recommend;
	    private String privateBoard;
	    private String boardType;
	    private String isRecommend;
	    private String pImg;
	    private String email;
}
