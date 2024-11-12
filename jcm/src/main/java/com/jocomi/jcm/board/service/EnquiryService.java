package com.jocomi.jcm.board.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.board.model.mapper.EnquiryBoardMapper;
import com.jocomi.jcm.board.model.vo.AnnouncementBoard;
import com.jocomi.jcm.board.model.vo.EnquiryBoard;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnquiryService {
	
	 private final EnquiryBoardMapper qMapper;
	 
	public ArrayList<EnquiryBoard> selectEB() {
		return qMapper.selectEB();
	}
	
	public EnquiryBoard getEnquiryById(int postNo) {
		 return qMapper.selectEnquiryById(postNo);
	}

	public boolean enrollEnquiryBoard(EnquiryBoard enquiryBoard) {
		return qMapper.enrollEnquiryBoard(enquiryBoard) > 0;
	}


}
