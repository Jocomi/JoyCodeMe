package com.jocomi.jcm.board.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.jocomi.jcm.board.model.vo.FreeBoard;
import com.jocomi.jcm.board.model.vo.ProjectBoard;

@Mapper
public interface ProjectBoardMapper {
	@Select("SELECT * FROM PROJECT_BOARD")
	ArrayList<ProjectBoard> selectPB();
	
	@Select("SELECT * FROM PROJECT_BOARD WHERE POST_NO = #{postNo}")
	
	ProjectBoard getProjectBoard(int postNo);
}
