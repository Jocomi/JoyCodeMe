package com.jocomi.jcm.board.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.board.model.mapper.AnnouncementBoardMapper;
import com.jocomi.jcm.board.model.vo.AnnouncementBoard;
import com.jocomi.jcm.model.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
	 private final AnnouncementBoardMapper aMapper;
	 
	public ArrayList<AnnouncementBoard> selsectAB() {
		return aMapper.selectAB();
	}
	
    public AnnouncementBoard getAnnouncementById(int postNo) {
        return aMapper.selectAnnouncementById(postNo);
    }

    public boolean deactivatePost(String boardType, int postNo) {
        int result = aMapper.deactivatePost(boardType, postNo);
        return result > 0; // STATUS 값 업데이트 성공 여부 반환
    }
}
