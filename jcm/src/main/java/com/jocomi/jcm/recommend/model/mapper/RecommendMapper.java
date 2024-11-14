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

	
	@Select("SELECT COUNT(*) FROM USER_RECOMMEND WHERE MEMBER_ID = #{memberId} AND POST_NO = #{postNo} AND BOARD_TYPE = #{boardType}")
	int selectRecommend(Recommend recommend);
	
	@Insert("INSERT INTO USER_RECOMMEND (MEMBER_ID, POST_NO, BOARD_TYPE)"
			+ "VALUES (#{memberId}, #{postNo}, #{boardType})")
	int addRecommendUser(Recommend recommend);

	@Delete("DELETE FROM USER_RECOMMEND WHERE MEMBER_ID = #{memberId}  AND POST_NO = #{postNo}  AND BOARD_TYPE = #{boardType}")
	int deleteRecommendUser(Recommend recommend);

	@Update("UPDATE ${boardType}_BOARD SET RECOMMEND = RECOMMEND + 1 WHERE POST_NO = #{postNo}")
	void addRecommend(Recommend recommend);

	@Update("UPDATE ${boardType}_BOARD SET RECOMMEND = RECOMMEND - 1 WHERE POST_NO = #{postNo}")
	void deleteRecommend(Recommend recommend);
	
	
	

	
}
