package com.jocomi.jcm.board.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.board.model.mapper.EnquiryBoardMapper;
import com.jocomi.jcm.board.model.vo.EnquiryBoard;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnquirytyService {
	
	 private final EnquiryBoardMapper bMapper;
	 
	public ArrayList<EnquiryBoard> selectEB() {
		return bMapper.selectEB();
	}
	
	public EnquiryBoard getEnquiryById(int postNo) {
		 return bMapper.selectEnquiryById(postNo);
	}
}
