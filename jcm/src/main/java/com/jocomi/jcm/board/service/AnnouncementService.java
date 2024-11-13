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
	 private final AnnouncementBoardMapper nMapper;
	 
	public ArrayList<AnnouncementBoard> selsectAB() {
		return nMapper.selectAB();
	}
	
    public AnnouncementBoard getAnnouncementById(int postNo) {
    		   nMapper.annViewCount(postNo);
        return nMapper.selectAnnouncementById(postNo);
    }

    public boolean deactivatePost(String boardType, int postNo) {
        int result = nMapper.deactivatePost(boardType, postNo);
        return result > 0; // STATUS 값 업데이트 성공 여부 반환
    }

	public boolean enrollAnnouncement(AnnouncementBoard announcement) {
		return nMapper.enrollAnnouncement(announcement) > 0;
	}

	 // 게시글 수정 서비스
    public boolean editAnnouncement(int postNo, AnnouncementBoard announcement) {
        // 게시글의 postNo를 기준으로 수정 요청
        int result = nMapper.updateAnnouncement(postNo, announcement);

        // 업데이트 성공 시 1, 실패 시 0 반환
        return result > 0;
    }
}
