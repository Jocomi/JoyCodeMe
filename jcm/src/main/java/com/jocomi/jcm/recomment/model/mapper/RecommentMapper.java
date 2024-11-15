package com.jocomi.jcm.recomment.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.jocomi.jcm.comment.model.vo.BoardComment;
import com.jocomi.jcm.recomment.model.vo.Recomment;

@Mapper
public interface RecommentMapper {

	public int insertPRecomment(@Param("recomment") Recomment recomment);

	public int insertFRecomment(@Param("recomment") Recomment recomment);

	public List<Recomment> getFreeRecommentsByCommentNo(int commentNo);

	public List<Recomment> getProjectRecommentsByCommentNo(int commentNo);

	
	
}
