package com.jocomi.jcm.board.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.jocomi.jcm.board.model.vo.FreeBoard;

@Mapper
public interface FreeBoardMapper {

	@Select("SELECT * FROM FREE_BOARD")
	ArrayList<FreeBoard> selectFB();

	@Select("SELECT * FROM FREE_BOARD WHERE POST_NO = #{postNo}")
	FreeBoard detailFree(int postNo);

}
