package com.jocomi.jcm.board.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.jocomi.jcm.board.model.vo.FreeBoard;
import com.jocomi.jcm.board.model.vo.ProjectBoard;
import com.jocomi.jcm.board.service.ProjectService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class ProjectController {
	
	 private final ProjectService pService;
	
	 @GetMapping(value = "/selectPB", produces = "application/json;charset=UTF-8")
	 public ArrayList<ProjectBoard> selectPB() {
		 ArrayList<ProjectBoard> pBoard = pService.selectPB();
		 return pBoard;
	 }
	 
	 @GetMapping(value = "/project/{postNo}", produces = "application/json;charset=UTF-8")
	 public ProjectBoard detailProject(@PathVariable("postNo") int postNo) {
		 ProjectBoard frojectBoard = pService.getProjectBoard(postNo);
		 if (frojectBoard != null) {
		     System.out.println(frojectBoard);
		 } else {
		     System.out.println("해당 번호의 게시글을 찾을 수 없습니다.");
		 }
		 return frojectBoard;
	 }
}
