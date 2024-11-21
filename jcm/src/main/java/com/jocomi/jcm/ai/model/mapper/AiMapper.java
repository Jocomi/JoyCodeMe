package com.jocomi.jcm.ai.model.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.jocomi.jcm.ai.model.vo.AI;
import com.jocomi.jcm.payment.model.vo.Payment;

@Mapper
public interface AiMapper {
	
	int insertWebHistory(AI ai);
	
	int insertFuncHistory(AI ai);
	
	int insertDbHistory(AI ai);

	ArrayList<AI> getHistory(AI ai);

	Payment getGrade(Payment payment);


}
