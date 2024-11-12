package com.jocomi.jcm.comment.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.comment.model.mapper.CommentMapper;
import com.jocomi.jcm.comment.model.vo.BoardComment;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentMapper cMapper;
	public ArrayList<BoardComment> selectComment(int postNo, String boardType) {
		if(boardType.equals("project")) {
			return cMapper.selectPComment(postNo);
		}else if(boardType.equals("free")) {
			return cMapper.selectFComment(postNo);
		}else if(boardType.equals("enquiry")){
			return cMapper.selectEComment(postNo);
		}else {
			return  null;
		}
		
		
	}
	public int insertComment(BoardComment comment, int postNo, String boardType) {
		if(boardType.equals("project")) {
			return cMapper.insertPComment(postNo, comment);
		}else if(boardType.equals("free")) {
			return cMapper.insertFComment(postNo, comment);
		}else if(boardType.equals("enquiry")){
			return cMapper.insertEComment(postNo, comment);
		}else {
			return 0;
		}
		
	}
}
