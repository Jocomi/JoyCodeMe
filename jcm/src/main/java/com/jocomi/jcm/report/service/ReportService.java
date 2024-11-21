package com.jocomi.jcm.report.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.report.model.mapper.ReportMapper;
import com.jocomi.jcm.report.model.vo.ReportVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {
		
	    private final ReportMapper reportMapper;

	    public int createReport(String boardType, int postNo, ReportVo report) {
	        // 신고 처리 로직
	      return reportMapper.insertReport(boardType, postNo, report);
	    }
	    public List<ReportVo> getAllReports() {
	        return reportMapper.findAllReports();
	    }
		public boolean deactivateReport(String boardType, int postNo,ReportVo report) {
			 int result = reportMapper.deactivateReport(boardType, postNo, report);
		        return result > 0; // STATUS 값 업데이트 성공 여부 반환
		}
		  
}
