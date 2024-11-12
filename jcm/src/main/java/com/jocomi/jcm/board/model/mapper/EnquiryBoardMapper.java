package com.jocomi.jcm.board.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;


import com.jocomi.jcm.board.model.vo.EnquiryBoard;

@Mapper
public interface EnquiryBoardMapper {

	@Select("SELECT * FROM ENQUIRY_BOARD")
	ArrayList<EnquiryBoard> selectEB();
	
	@Select("SELECT * FROM ENQUIRY_BOARD WHERE POST_NO = #{postNo}")
	EnquiryBoard selectEnquiryById(int postNo);
}
