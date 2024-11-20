package com.jocomi.jcm.ai.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.jocomi.jcm.ai.model.vo.AI;

@Mapper
public interface AiMapper {
	
	int insertWebHistory(AI ai);
	
	int insertFuncHistory(AI ai);
	
	int insertDbHistory(AI ai);

	ArrayList<AI> getHistory(AI ai);

}
