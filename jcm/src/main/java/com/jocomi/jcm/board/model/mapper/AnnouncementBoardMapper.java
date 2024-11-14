package com.jocomi.jcm.board.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.jocomi.jcm.board.model.vo.AnnouncementBoard;

@Mapper
public interface AnnouncementBoardMapper {

	 ArrayList<AnnouncementBoard> selectAB();

	    AnnouncementBoard selectAnnouncementById(int postNo);

	    int deactivatePost(@Param("boardType") String boardType, @Param("postNo") int postNo);

	    int enrollAnnouncement(AnnouncementBoard announcement);

	    int updateAnnouncement(@Param("postNo") int postNo, @Param("announcement") AnnouncementBoard announcement);

	    void annViewCount(int postNo);

}
