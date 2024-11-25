package com.jocomi.jcm.report.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jocomi.jcm.report.model.vo.ReportVo;
import com.jocomi.jcm.report.service.ReportService;

import lombok.RequiredArgsConstructor;


@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class ReportController {

		private final ReportService rService;
		
	 @PostMapping(value = "/{boardType}/{postNo}/report" , produces = "application/json;charset=UTF-8" )
	    public ResponseEntity<Map<String, Integer>> createReport(@PathVariable String boardType, @PathVariable int postNo, @RequestBody ReportVo report){
		int result = rService.createReport(boardType, postNo, report);
		Map<String, Integer> response = new HashMap<>();
	    response.put("result", result);
	    
	    return ResponseEntity.ok(response);
	 }
	 @GetMapping("/select/report")
	    public List<ReportVo> getReports() {
		 System.out.println(rService.getAllReports());
	        return rService.getAllReports();
	    }
	 @PutMapping(value = "/{boardType}/{postNo}/deactivate/report" , produces = "application/json;charset=UTF-8")
	    public String deactivatePost(@PathVariable String boardType, @PathVariable int postNo, @RequestBody ReportVo report) {
	        boolean isUpdated = rService.deactivateReport(boardType, postNo, report);
	        return isUpdated ? "신고 처리가 완료 되었습니다." : "게시글 삭제에 실패했습니다.";
	    }
	
}
