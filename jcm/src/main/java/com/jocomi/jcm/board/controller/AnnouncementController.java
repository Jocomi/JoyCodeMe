package com.jocomi.jcm.board.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.jocomi.jcm.board.model.vo.AnnouncementBoard;
import com.jocomi.jcm.board.service.AnnouncementService;

import lombok.RequiredArgsConstructor;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class AnnouncementController {
	
	 private final AnnouncementService aService;
	 
	 @GetMapping(value = "/selectAB", produces = "application/json;charset=UTF-8")
	 public ArrayList<AnnouncementBoard>  selectAB() {
		 ArrayList<AnnouncementBoard> aList = aService.selsectAB();

		 return aList;
	 }
	 // 상세 게시글 가져오기 (postNo를 통해 특정 게시글 조회)
	 @GetMapping(value = "/announcement/{postNo}", produces = "application/json;charset=UTF-8")
	 public AnnouncementBoard getAnnouncementById(@PathVariable("postNo") int postNo) {
		 AnnouncementBoard announcement = aService.getAnnouncementById(postNo);
			 return announcement;
		
	 }
	 @PutMapping("/{boardType}/{postNo}/deactivate")
	    public String deactivatePost(@PathVariable String boardType, @PathVariable int postNo) {
	        boolean isUpdated = aService.deactivatePost(boardType, postNo);
	        return isUpdated ? "게시글이 삭제되었습니다." : "게시글 삭제에 실패했습니다.";
	    }
}
