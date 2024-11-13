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

	@Select("SELECT * FROM FREE_BOARD")
	ArrayList<FreeBoard> selectFB();

	@Select("SELECT * FROM FREE_BOARD WHERE POST_NO = #{postNo}")
	FreeBoard detailFree(int postNo);

	@Insert("INSERT INTO FREE_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, POST_TIME, POST_COUNT, STATUS) VALUES (FRE_POST_NO.NEXTVAL, #{memberId}, #{postTitle}, #{postContent}, #{imgFile}, DEFAULT, DEFAULT, #{status})")
	@Options(useGeneratedKeys = true)
	int enrollfreeBoard(FreeBoard freeBoard);
	
	@Update("UPDATE FREE_BOARD SET POST_COUNT = POST_COUNT + 1 WHERE POST_NO = #{postNo}")
	void freeViewCount(int postNo);

}
