package com.jocomi.jcm.report.model.vo;

import lombok.Data;

@Data
public class ReportVo {
	  private int reportNo;       // 신고 번호 (PRIMARY KEY)
	    private Long postNo;         // 게시물 번호
	    private String reportText;
	    private String reportId;     // 신고자 ID (MEMBER 테이블의 MEMBER_ID 참조)
	    private String reportTime;     // 신고 시간 (기본값: 현재 시간)
	    private String boardType;    // 게시판 유형 (FREE, PROJECT, ENQUIRY, ANNOUNCEMENT)
	    private String status;       // 신고 상태 (Y: 활성, N: 비활성)
}
