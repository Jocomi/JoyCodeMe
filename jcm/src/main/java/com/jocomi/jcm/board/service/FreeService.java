package com.jocomi.jcm.board.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.board.model.mapper.FreeBoardMapper;
import com.jocomi.jcm.board.model.vo.FreeBoard;
import com.jocomi.jcm.board.model.vo.AnnouncementBoard;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FreeService {
		private final FreeBoardMapper fMapper;
	public ArrayList<FreeBoard> selectFB() {
		return fMapper.selectFB();
	}
	public FreeBoard getfreeById(int postNo) {
		// TODO Auto-gnerated method stub
		return fMapper.detailFree(postNo);
	}
	public boolean enrollfreeBoard(FreeBoard freeBoard) {
		return fMapper.enrollfreeBoard(freeBoard) > 0;
	}
	

}
