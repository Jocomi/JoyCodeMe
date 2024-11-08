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
}
