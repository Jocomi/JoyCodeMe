package com.jocomi.jcm.board.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.board.model.mapper.ProjectBoardMapper;
import com.jocomi.jcm.board.model.vo.FreeBoard;
import com.jocomi.jcm.board.model.vo.ProjectBoard;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {
	private final ProjectBoardMapper pMapper;
	public ArrayList<ProjectBoard> selectPB() {
		// TODO Auto-generated method stub
		return pMapper.selectPB();
	}
	public ProjectBoard getProjectBoard(int postNo) {
		// TODO Auto-generated method stub
		return pMapper.getProjectBoard(postNo);
	}

}
