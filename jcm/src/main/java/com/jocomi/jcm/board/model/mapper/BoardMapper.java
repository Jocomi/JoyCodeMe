package com.jocomi.jcm.board.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.jocomi.jcm.board.model.dto.DetailBoardDto;
import com.jocomi.jcm.board.model.vo.AnnouncementBoard;

@Mapper
public interface BoardMapper {

		ArrayList<DetailBoardDto> selectAB(String boardType);

	 	DetailBoardDto selectAnnouncementById(int postNo, String boardType);
	 	
	    int deactivatePost(@Param("boardType") String boardType, @Param("postNo") int postNo);

	    int insertBoard(@Param("boardType") String boardType, @Param("board") DetailBoardDto boardDTO);


	    void annViewCount(int postNo , String boardType);

	    int updateBoard(@Param("boardType") String boardType, 
                @Param("postNo") int postNo, 
                @Param("boardDto") DetailBoardDto boardDto);
}
