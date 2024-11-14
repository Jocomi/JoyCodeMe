package com.jocomi.jcm.board.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.jocomi.jcm.board.model.vo.FreeBoard;

@Mapper
public interface FreeBoardMapper {

	 ArrayList<FreeBoard> selectFB();

	    FreeBoard detailFree(int postNo);

	    int enrollfreeBoard(FreeBoard freeBoard);

	    void freeViewCount(int postNo);

}
