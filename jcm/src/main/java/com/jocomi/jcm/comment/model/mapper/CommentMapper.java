package com.jocomi.jcm.comment.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.jocomi.jcm.comment.model.vo.BoardComment;

@Mapper
public interface CommentMapper {

		ArrayList<BoardComment> selectFComment(int postNo);
		
		ArrayList<BoardComment> selectPComment(int postNo);
		
		ArrayList<BoardComment> selectEComment(int postNo);
		
		int insertPComment(@Param("postNo") int postNo, @Param("comment") BoardComment comment);
		
		int insertFComment(@Param("postNo") int postNo, @Param("comment") BoardComment comment);
		
		int insertEComment(@Param("postNo") int postNo, @Param("comment") BoardComment comment);

		int deletePComment(@Param("commentNo") int commentNo);

		int deleteFComment(@Param("commentNo") int commentNo);

		int deleteEComment(@Param("commentNo") int commentNo);

}

		
