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
	  ArrayList<ProjectBoard> selectPB();

	    ProjectBoard getProjectBoard(int postNo);

	    int enrollProjectBoard(ProjectBoard projectBoard);

	    void proViewCount(int postNo);
}
