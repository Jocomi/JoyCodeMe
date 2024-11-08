package com.jocomi.jcm.board.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.jocomi.jcm.board.model.vo.AnnouncementBoard;
import com.jocomi.jcm.board.model.vo.EnquiryBoard;
import com.jocomi.jcm.board.service.EnquirytyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class EnquiryController {
	
	 private final EnquirytyService eService;
	 
	 @GetMapping(value = "/selectEB", produces = "application/json;charset=UTF-8")
	 public ArrayList<EnquiryBoard>  selectEB() {
		 ArrayList<EnquiryBoard> aList = eService.selectEB();
		 System.out.println(aList);
		 return aList;
	 }
	 // 상세 게시글 가져오기 (postNo를 통해 특정 게시글 조회)
	 @GetMapping(value = "/enquiry/{postNo}", produces = "application/json;charset=UTF-8")
	 public EnquiryBoard getEnquiryById(@PathVariable("postNo") int postNo) {
		 EnquiryBoard enquiry = eService.getEnquiryById(postNo);
		 if (enquiry != null) {
		     System.out.println(enquiry);
		 } else {
		     System.out.println("해당 번호의 게시글을 찾을 수 없습니다.");
		 }
		 return enquiry;
	 }
}
