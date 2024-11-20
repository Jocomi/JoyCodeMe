package com.jocomi.jcm.board.controller;



import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.jocomi.jcm.board.model.dto.DetailBoardDto;
import com.jocomi.jcm.board.service.BoardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;       
         
@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class BoardController {
		
	
	 private final BoardService bService;
	 
	 @GetMapping(value = "/select{boardType}", produces = "application/json;charset=UTF-8")
	 public ArrayList<DetailBoardDto>  selectAB( @PathVariable("boardType")  String boardType) {
		 ArrayList<DetailBoardDto> aList = bService.selsectAB(boardType);
		 return aList;
	 }
	 // 상세 게시글 가져오기 (postNo를 통해 특정 게시글 조회)
	 @GetMapping(value = "/detail/{boardType}/{postNo}", produces = "application/json;charset=UTF-8")
	 public DetailBoardDto getAnnouncementById(@PathVariable("postNo") int postNo, @PathVariable("boardType") String boardType , @RequestParam("memberId") String memberId) {
		 
		 DetailBoardDto announcement = bService.getAnnouncementById(postNo, boardType, memberId);
			 return announcement;
		
	 }
	 @PutMapping(value = "/{boardType}/{postNo}/deactivate" , produces = "application/json;charset=UTF-8")
	    public String deactivatePost(@PathVariable String boardType, @PathVariable int postNo) {
	        boolean isUpdated = bService.deactivatePost(boardType, postNo);
	        return isUpdated ? "게시글이 삭제되었습니다." : "게시글 삭제에 실패했습니다.";
	    }
	 



	 @PostMapping(value = "/create/{boardType}" , produces = "application/json;charset=UTF-8" )
	    public ResponseEntity<Map<String, Object>> createBoard(@PathVariable String boardType, @RequestBody DetailBoardDto boardDTO) {
	        boolean isSaved = bService.insertBoard( boardType, boardDTO);
	        Map<String, Object> response = new HashMap<>();
	        response.put("success", isSaved);
	        return ResponseEntity.ok(response);
	    }
	 
	 
	 
	 
	 
	 @ResponseBody
	 @PostMapping(value="/upload", produces="application/json;charset=UTF-8")
	 public String uploadImage(List<MultipartFile> imgList) {
	     log.info("{}", imgList);

	     List<String> changeNameList = new ArrayList<>();
	     
	     for (MultipartFile file : imgList) {
	         String changeName = saveFile(file);
	         log.info("change name : {}", changeName);
	         changeNameList.add(changeName);
	     }
	     return new Gson().toJson(changeNameList);  // ArrayList -> JSONArray
	 }

	 // --------------------------------------------
	 private String saveFile(MultipartFile upfile) {
	     // 파일명을 변경하여 저장
	     // 변경 파일명 => yyyyMMddHHmmss + xxxxx(랜덤값) + .확장자

	     // 현재 날짜 시간 정보
	     String currTime = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
	     // 5자리 랜덤값 ( 10000 ~ 99999 )
	     int random = (int)(Math.random() * (99999 - 10000 + 1)) + 10000;
	     // 확장자 (.txt, .java, .png, ...)
	     String orgName = upfile.getOriginalFilename();
	     String ext = orgName.substring(orgName.lastIndexOf("."));
	     String chgName = currTime + random + ext;

	     String uploadDir = "./uploads/";
	     Path savePath = Paths.get(uploadDir + chgName);

	     try {
	         Files.createDirectories(savePath.getParent());  // 상위 디렉토리가 없을 경우 생성
	         Files.write(savePath, upfile.getBytes());  // 파일을 서버에 저장
	     } catch (IOException e) {
	         e.printStackTrace();
	     }

	     return uploadDir + chgName;
	 }
	 
	 @PutMapping("/update/{boardType}/{postNo}")
	    public ResponseEntity<Map<String, Object>> updatePost(
	            @PathVariable String boardType,
	            @PathVariable int postNo,
	            @RequestBody DetailBoardDto boardDto) {
	        Map<String, Object> response = new HashMap<>();
	        try {
	            boolean isUpdated = bService.updateBoard(boardType, postNo, boardDto);
	            response.put("success", isUpdated);
	            return ResponseEntity.ok(response);
	        } catch (Exception e) {
	            response.put("error", "게시물 수정 실패");
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	        }
	    }
	}





