package com.jocomi.jcm.board.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.jocomi.jcm.board.model.vo.AnnouncementBoard;

@Mapper
public interface AnnouncementBoardMapper {

	@Select("SELECT * FROM ANNOUNCEMENT_BOARD")
	ArrayList<AnnouncementBoard> selectAB();
	
	@Select("SELECT * FROM ANNOUNCEMENT_BOARD WHERE POST_NO = #{postNo}")
	AnnouncementBoard selectAnnouncementById(int postNo);

	  @Update("UPDATE ${boardType}_BOARD SET STATUS = 'N' WHERE POST_NO = #{postNo}")
	  int deactivatePost(@Param("boardType") String boardType, @Param("postNo") int postNo);

}
