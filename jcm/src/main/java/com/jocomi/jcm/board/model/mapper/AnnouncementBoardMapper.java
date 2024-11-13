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

	@Select("SELECT * FROM ANNOUNCEMENT_BOARD")
	ArrayList<AnnouncementBoard> selectAB();
	
	@Select("SELECT * FROM ANNOUNCEMENT_BOARD WHERE POST_NO = #{postNo}")
	AnnouncementBoard selectAnnouncementById(int postNo);

	@Update("UPDATE ${boardType}_BOARD SET STATUS = 'N' WHERE POST_NO = #{postNo}")
	int deactivatePost(@Param("boardType") String boardType, @Param("postNo") int postNo);

	@Insert("INSERT INTO ANNOUNCEMENT_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, POST_TIME, COUNT_VIEW, STATUS) VALUES (ANN_POST_NO.NEXTVAL, #{memberId}, #{postTitle}, #{postContent}, #{imgFile}, DEFAULT, DEFAULT, #{status})")
	@Options(useGeneratedKeys = true)
	int enrollAnnouncement(AnnouncementBoard announcement);	

	// 게시글 수정
    @Update("UPDATE ANNOUNCEMENT_BOARD " +
            "SET POST_TITLE = #{announcement.postTitle}, " +
            "POST_CONTENT = #{announcement.postContent}, " +
            "STATUS = #{announcement.status}, " +
            "IMG_FILE = #{announcement.imgFile} " +
            "WHERE POST_NO = #{postNo}")
    int updateAnnouncement(@Param("postNo") int postNo, @Param("announcement") AnnouncementBoard announcement);
    
    @Update("UPDATE ANNOUNCEMENT_BOARD SET COUNT_VIEW = COUNT_VIEW + 1 WHERE POST_NO = #{postNo}")
	void annViewCount(int postNo);

}
