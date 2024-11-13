package com.jocomi.jcm.board.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jocomi.jcm.board.model.vo.EnquiryBoard;
import com.jocomi.jcm.board.service.EnquiryService;

import lombok.RequiredArgsConstructor;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class EnquiryController {
	
	 private final EnquiryService qService;
	 
	 @GetMapping(value = "/selectEB", produces = "application/json;charset=UTF-8")
	 public ArrayList<EnquiryBoard>  selectEB() {
		 ArrayList<EnquiryBoard> aList = qService.selectEB();
		 System.out.println(aList);
		 return aList;
	 }
	 // 상세 게시글 가져오기 (postNo를 통해 특정 게시글 조회)
	 @GetMapping(value = "/enquiry/{postNo}", produces = "application/json;charset=UTF-8")
	 public EnquiryBoard getEnquiryById(@PathVariable("postNo") int postNo) {
		 EnquiryBoard enquiry = qService.getEnquiryById(postNo);
		 return enquiry;
	 }
	 
	 @PostMapping(value ="/enrollenquiry", produces ="application/json;charset=UTF-8")
	 public ResponseEntity<String> createEnquiry(
			 @RequestPart("enquiry") EnquiryBoard enquiryBoard,
			 @RequestPart(value="file", required=false) MultipartFile file
			 ){
		 try {
			 if(file != null && !file.isEmpty()) {
				  // 파일 저장 경로 지정 (절대 경로 사용)
	             String uploadDir = "C:/workspace/joycodeme/jcm/src/main/resources/static/boardImg/"; 
	             
	             // 파일 이름에 UUID 추가하여 중복 방지
	             String originalFileName = file.getOriginalFilename();
	             String fileExtension = "";
	             int dotIndex = originalFileName.lastIndexOf(".");
	             if (dotIndex > 0) {
	                 fileExtension = originalFileName.substring(dotIndex);
	             }
	             String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

	             Path filePath = Paths.get(uploadDir + uniqueFileName);

	             // 디렉토리가 존재하지 않으면 생성
	             if (!Files.exists(filePath.getParent())) {
	                 Files.createDirectories(filePath.getParent());
	             }

	             // 파일을 지정된 경로에 저장
	             Files.write(filePath, file.getBytes());

	             // 파일 경로를 DB에 저장할 때 상대 경로로 저장
	             enquiryBoard.setImgFile(uniqueFileName);
	         }
			 System.out.println(enquiryBoard);
			 boolean isCreated = qService.enrollEnquiryBoard(enquiryBoard);
	         if (isCreated) {
	             return new ResponseEntity<>("게시물이 등록되었습니다.", HttpStatus.CREATED);
	         } else {
	             return new ResponseEntity<>("게시물 등록에 실패했습니다.", HttpStatus.BAD_REQUEST);
	         }
	     } catch (IOException e) {
	         return new ResponseEntity<>("파일 저장 중 오류 발생: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	     }
	 }
	
}
