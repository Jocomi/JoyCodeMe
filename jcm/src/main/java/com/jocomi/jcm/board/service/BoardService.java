package com.jocomi.jcm.board.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.board.model.dto.DetailBoardDto;
import com.jocomi.jcm.board.model.mapper.BoardMapper;
import com.jocomi.jcm.board.model.vo.AnnouncementBoard;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
	 private final BoardMapper nMapper;
	 
	public ArrayList<DetailBoardDto> selsectAB(String boardType) {
		return nMapper.selectAB(boardType);
	}
	
    public DetailBoardDto getAnnouncementById(int postNo, String boardType) {
    		   nMapper.annViewCount(postNo, boardType);
        return nMapper.selectAnnouncementById(postNo, boardType);
    }

    public boolean deactivatePost(String boardType, int postNo) {
        int result = nMapper.deactivatePost(boardType, postNo);
        return result > 0; // STATUS 값 업데이트 성공 여부 반환
    }


    public boolean insertBoard(String boardType, DetailBoardDto boardDTO) {
        return nMapper.insertBoard(boardType, boardDTO) > 0;
    }

	public boolean updateBoard(String boardType, int postNo, DetailBoardDto boardDto) {
		   // 게시글 수정
        int result = nMapper.updateBoard(boardType, postNo, boardDto);
        return result > 0;
	}
}
