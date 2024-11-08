package com.jocomi.jcm.board.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.jocomi.jcm.board.model.vo.AnnouncementBoard;
import com.jocomi.jcm.board.service.AnnouncementService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class AnnouncementController {
	
	 private final AnnouncementService aService;
	 
	 @GetMapping(value = "/selectAB", produces = "application/json;charset=UTF-8")
	 public ArrayList<AnnouncementBoard>  selectAB() {
		 ArrayList<AnnouncementBoard> aList = aService.selsectAB();
		 System.out.println(aList);
		 return aList;
	 }
	 // 상세 게시글 가져오기 (postNo를 통해 특정 게시글 조회)
	 @GetMapping(value = "/announcement/{postNo}", produces = "application/json;charset=UTF-8")
	 public AnnouncementBoard getAnnouncementById(@PathVariable("postNo") int postNo) {
		 AnnouncementBoard announcement = aService.getAnnouncementById(postNo);
		 if (announcement != null) {
		     System.out.println(announcement);
		 } else {
		     System.out.println("해당 번호의 게시글을 찾을 수 없습니다.");
		 }
		 return announcement;
	 }
}
