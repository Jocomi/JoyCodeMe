package com.jocomi.jcm.comment.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jocomi.jcm.comment.model.vo.BoardComment;
import com.jocomi.jcm.comment.service.CommentService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BoardCommentController {

	private final CommentService cService;
	
	@GetMapping(value="/comment/{boardType}/{postNo}",  produces = "application/json;charset=UTF-8")
	@ResponseBody
	public ArrayList<BoardComment> selectComment(@PathVariable int postNo,@PathVariable String boardType){
		ArrayList<BoardComment> cList = cService.selectComment(postNo, boardType);
		return cList;
				
				
	}
	
	@PostMapping(value="/comment/{boardType}/{postNo}/add", produces = "application/json;charset=UTF-8")
	public ResponseEntity<Map<String, Integer>> insert(@PathVariable int postNo, @PathVariable String boardType, @RequestBody BoardComment comment) {
	    int result = cService.insertComment(comment, postNo, boardType);
	    Map<String, Integer> response = new HashMap<>();
	    response.put("result", result);
	    
	    return ResponseEntity.ok(response);
	}
	
	@PutMapping(value = "/comment/{boardType}/{commentNo}/delete" , produces ="application/json;charset=UTF-8")
	public ResponseEntity<Integer> deleteComment(@PathVariable int commentNo, @PathVariable String boardType) {
		int result = cService.deleteComment(commentNo, boardType);
		
		return ResponseEntity.ok(result);
	}

}
