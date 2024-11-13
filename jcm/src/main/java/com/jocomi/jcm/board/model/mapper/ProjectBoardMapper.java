package com.jocomi.jcm.board.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.jocomi.jcm.board.model.vo.ProjectBoard;

@Mapper
public interface ProjectBoardMapper {
	@Select("SELECT * FROM PROJECT_BOARD")
	ArrayList<ProjectBoard> selectPB();
	
	@Select("SELECT * FROM PROJECT_BOARD WHERE POST_NO = #{postNo}")
	ProjectBoard getProjectBoard(int postNo);

	@Insert("INSERT INTO PROJECT_BOARD (POST_NO, MEMBER_ID, POST_TITLE, POST_CONTENT, IMG_FILE, POST_TIME, COUNT_VIEW, PRIVATE_PROJECT)"
			+ " VALUES (PRO_POST_NO.NEXTVAL, #{memberId}, #{postTitle}, #{postContent}, #{imgFile}, DEFAULT, DEFAULT, #{status})")
	@Options(useGeneratedKeys = true)
	int enrollProjectBoard(ProjectBoard projectBoard);

	@Update("UPDATE PROJECT_BOARD SET POST_COUNT = POST_COUNT + 1 WHERE POST_NO = #{postNo}")
	void proViewCount(int postNo);
}
