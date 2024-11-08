package com.jocomi.jcm.comment.model.vo;

import lombok.Data;

@Data
public class BoardComment {
	 	private int commentNo; // COMMENT_NO
	    private String memberId; // MEMBER_ID
	    private int postNo; // FREEBOARD_NO
	    private String commentText; // COMMENT_TEXT
	    private String commentTime; // COMMENT_TIME
	    private char status; // STATUS
	    // MyBatis에서 사용할 boardType 필드 추가
	    private String boardType; // BOARD_TYPE
}
