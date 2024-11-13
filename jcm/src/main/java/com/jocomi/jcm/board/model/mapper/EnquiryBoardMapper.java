package com.jocomi.jcm.board.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.jocomi.jcm.board.model.vo.EnquiryBoard;

@Mapper
public interface EnquiryBoardMapper {

	@Select("SELECT * FROM ENQUIRY_BOARD")
	ArrayList<EnquiryBoard> selectEB();
	
	@Select("SELECT * FROM ENQUIRY_BOARD WHERE POST_NO = #{postNo}")
	EnquiryBoard selectEnquiryById(int postNo);

	@Insert("INSERT INTO ENQUIRY_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, POST_TIME, COUNT_VIEW, PRIVATE_ENQUIRY)"
			+ " VALUES (ENQ_POST_NO.NEXTVAL, #{memberId}, #{postTitle}, #{postContent}, #{imgFile}, DEFAULT, DEFAULT, #{status})")
	@Options(useGeneratedKeys = true)
	int enrollEnquiryBoard(EnquiryBoard enquiryBoard);

	@Update("UPDATE ENQUIRY_BOARD SET COUNT_VIEW = COUNT_VIEW + 1 WHERE POST_NO = #{postNo}")
	void enqViewCount(int postNo);
	
	
}
