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


    ArrayList<EnquiryBoard> selectEB();

    EnquiryBoard selectEnquiryById(int postNo);

    int enrollEnquiryBoard(EnquiryBoard enquiryBoard);

    void enqViewCount(int postNo);
	
	
}
