package com.jocomi.jcm.recommend.service;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.recommend.model.mapper.RecommendMapper;
import com.jocomi.jcm.recommend.model.vo.Recommend;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecommendService {
	
	private final RecommendMapper rMapper;
	
	public int addRecommend(Recommend recommend) {
		int result = rMapper.selectRecommend(recommend);
		if(result == 0) {
					
					rMapper.addRecommend(recommend);
					rMapper.addRecommendUser(recommend);
					
					return 1;
		}else{
			 		rMapper.deleteRecommendUser(recommend);	
			 		rMapper.deleteRecommend(recommend);
				  
				   return 0;
		}
		
		
	}


}
