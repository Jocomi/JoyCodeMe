package com.jocomi.jcm.board.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.jocomi.jcm.board.model.vo.AnnouncementBoard;

@Mapper
public interface AnnouncementBoardMapper {

	@Select("SELECT * FROM ANNOUNCEMENT_BOARD")
	ArrayList<AnnouncementBoard> selectAB();
	
	@Select("SELECT * FROM ANNOUNCEMENT_BOARD WHERE POST_NO = #{postNo}")
	AnnouncementBoard selectAnnouncementById(int postNo);

}
