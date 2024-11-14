package com.jocomi.jcm.recommend.model.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.jocomi.jcm.recommend.model.vo.Recommend;

@Mapper
public interface RecommendMapper {

	

	int selectRecommend(Recommend recommend);
	
	
	int addRecommendUser(Recommend recommend);

	
	int deleteRecommendUser(Recommend recommend);


	void addRecommend(Recommend recommend);

	
	void deleteRecommend(Recommend recommend);
	
	
	

	
}
