package com.jocomi.jcm.report.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.jocomi.jcm.report.model.vo.ReportVo;

@Mapper
public interface ReportMapper {

	 public int insertReport(@Param("boardType") String boardType, 
              @Param("postNo") int postNo, 
             ReportVo report);
	 List<ReportVo> findAllReports();
	public int deactivateReport(@Param("boardType") String boardType, @Param("postNo") int postNo,@Param("report") ReportVo report);
}
