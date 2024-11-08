package com.jocomi.jcm.board.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.jocomi.jcm.board.model.vo.EnquiryBoard;
import com.jocomi.jcm.board.model.vo.FreeBoard;
import com.jocomi.jcm.board.service.FreeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class FreeController {
	
	 private final FreeService fService;
	
	 @GetMapping(value="/selectFB", produces = "application/json;charset=UTF-8")
	 public ArrayList<FreeBoard> selectFB(){
		 ArrayList<FreeBoard> fList = fService.selectFB();
		 return fList;
	 }
	 
	 // 상세 게시글 가져오기 (postNo를 통해 특정 게시글 조회)
	 @GetMapping(value = "/free/{postNo}", produces = "application/json;charset=UTF-8")
	 public FreeBoard freeById(@PathVariable("postNo") int postNo) {
		 FreeBoard freeBoard = fService.getfreeById(postNo);
		 if (freeBoard != null) {
		     System.out.println(freeBoard);
		 } else {
		     System.out.println("해당 번호의 게시글을 찾을 수 없습니다.");
		 }
		 return freeBoard;
	 }
}
