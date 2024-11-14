package com.jocomi.jcm.recommend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.jocomi.jcm.recommend.model.vo.Recommend;
import com.jocomi.jcm.recommend.service.RecommendService;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class RecommendController {
	
	private final RecommendService rService;
	
	@PostMapping("/recommend")
	public ResponseEntity<?> addRecommend(@RequestBody Recommend recommend) {
		 try {
		recommend.setBoardType(recommend.getBoardType().toUpperCase());
		int result = rService.addRecommend(recommend);
		  if (result > 0) {
	            return ResponseEntity.ok().body("{\"result\": 1, \"message\": \"추천이 성공적으로 추가되었습니다.\"}");
	        } else {
	            return ResponseEntity.ok().body("{\"result\": 0, \"message\": \"추천 추가에 실패했습니다.\"}");
	        }
	    } catch (Exception e) {
	        // 예외 처리
	        return ResponseEntity.status(500).body("{\"result\": 0, \"message\": \"서버 오류 발생.\"}");
	    }
	}
		
}
