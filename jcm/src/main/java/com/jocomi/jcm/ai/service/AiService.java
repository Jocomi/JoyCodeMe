package com.jocomi.jcm.ai.service;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.ai.model.mapper.AiMapper;
import com.jocomi.jcm.ai.model.vo.AI;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AiService {
	private final AiMapper aMapper;
	
	public int insertWebHistory(AI ai) {
		return aMapper.insertWebHistory(ai);
	}
	
	public int insertFuncHistory(AI ai) {
		return aMapper.insertFuncHistory(ai);
	}
	
	public int insertDbHistory(AI ai) {
		return aMapper.insertDbHistory(ai);
	}
	

}