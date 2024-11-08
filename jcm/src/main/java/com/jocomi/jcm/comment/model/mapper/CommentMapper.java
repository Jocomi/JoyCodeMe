package com.jocomi.jcm.comment.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.jocomi.jcm.comment.model.vo.BoardComment;

@Mapper
public interface CommentMapper {

	
		
		@Select("SELECT * FROM FREE_COMMENT WHERE POST_NO = #{postNo}")
		ArrayList<BoardComment> selectFComment(int postNo);
		
		@Select("SELECT * FROM PROJECT_COMMENT WHERE POST_NO = #{postNo}")
		ArrayList<BoardComment> selectPComment(int postNo);
		
		@Select("SELECT * FROM ENQUIRY_COMMENT WHERE POST_NO = #{postNo}")
		ArrayList<BoardComment> selectEComment(int postNo);

		
		@Insert("INSERT INTO PROJECT_COMMENT (COMMENT_NO, MEMBER_ID, POST_NO, COMMENT_TEXT, COMMENT_TIME, STATUS) " +
		        "VALUES (PROC_POST_NO.NEXTVAL, #{comment.memberId}, #{postNo}, #{comment.commentText}, SYSDATE, 'Y')")
		int insertPComment(@Param("postNo") int postNo, @Param("comment") BoardComment comment);
		@Insert("INSERT INTO FREE_COMMENT (COMMENT_NO, MEMBER_ID, POST_NO, COMMENT_TEXT, COMMENT_TIME, STATUS) " +
		        "VALUES (PROC_POST_NO.NEXTVAL, #{comment.memberId}, #{postNo}, #{comment.commentText}, SYSDATE, 'Y')")
		int insertFComment(@Param("postNo") int postNo, @Param("comment") BoardComment comment);
		@Insert("INSERT INTO ENQUIRY_COMMENT (COMMENT_NO, MEMBER_ID, POST_NO, COMMENT_TEXT, COMMENT_TIME, STATUS) " +
		        "VALUES (PROC_POST_NO.NEXTVAL, #{comment.memberId}, #{postNo}, #{comment.commentText}, SYSDATE, 'Y')")
		int insertEComment(@Param("postNo") int postNo, @Param("comment") BoardComment comment);

}

		
