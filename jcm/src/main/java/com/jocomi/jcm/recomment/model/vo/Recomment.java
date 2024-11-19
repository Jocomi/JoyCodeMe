package com.jocomi.jcm.recomment.model.vo;

import lombok.Data;

@Data
public class Recomment {
	   private int recommentNo;       // 댓글 번호
	    private String memberId;    // 회원 ID
	    private int commentNo;   // 댓글 번호
	    private String recommentText; // 댓글 내용
	    private String recommentTime;   // 댓글 작성 시간
	    private String status;      // 상태 ('Y' or 'N')
}
