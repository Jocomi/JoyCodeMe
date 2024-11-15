package com.jocomi.jcm.recomment.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.comment.model.vo.BoardComment;
import com.jocomi.jcm.recomment.model.mapper.RecommentMapper;
import com.jocomi.jcm.recomment.model.vo.Recomment;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecommentService {

	private final RecommentMapper rMapper;

	public int insertRecomment(Recomment recomment, int postNo, String boardType) {
		if(boardType.equals("project")) {
			return rMapper.insertPRecomment(recomment);
		}else if(boardType.equals("free")) {
			return rMapper.insertFRecomment(recomment);
		}else {
			return 0;
		}
	}

	public List<Recomment> getRecommentsByCommentNo(int commentNo, String boardType) {
		 // boardType에 따라 다른 메서드를 호출하여 데이터 처리
        if ("free".equalsIgnoreCase(boardType)) {
            return rMapper.getFreeRecommentsByCommentNo(commentNo);
        } else if ("project".equalsIgnoreCase(boardType)) {
            return rMapper.getProjectRecommentsByCommentNo(commentNo);
        } else {
            throw new IllegalArgumentException("Invalid board type: " + boardType);
        }
    }
	
}
