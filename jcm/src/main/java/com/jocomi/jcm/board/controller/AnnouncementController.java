package com.jocomi.jcm.board.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jocomi.jcm.board.model.vo.AnnouncementBoard;
import com.jocomi.jcm.board.service.AnnouncementService;

import lombok.RequiredArgsConstructor;       
            

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class AnnouncementController {
	
	 private final AnnouncementService nService;
	 
	 @GetMapping(value = "/selectAB", produces = "application/json;charset=UTF-8")
	 public ArrayList<AnnouncementBoard>  selectAB() {
		 ArrayList<AnnouncementBoard> aList = nService.selsectAB();

		 return aList;
	 }
	 // 상세 게시글 가져오기 (postNo를 통해 특정 게시글 조회)
	 @GetMapping(value = "/announcement/{postNo}", produces = "application/json;charset=UTF-8")
	 public AnnouncementBoard getAnnouncementById(@PathVariable("postNo") int postNo) {
		 AnnouncementBoard announcement = nService.getAnnouncementById(postNo);
			 return announcement;
		
	 }
	 @PutMapping("/{boardType}/{postNo}/deactivate")
	    public String deactivatePost(@PathVariable String boardType, @PathVariable int postNo) {
	        boolean isUpdated = nService.deactivatePost(boardType, postNo);
	        return isUpdated ? "게시글이 삭제되었습니다." : "게시글 삭제에 실패했습니다.";
	    }
	 


	 @PostMapping(value="/enrollannouncement", produces = "application/json;charset=UTF-8")
	 public ResponseEntity<String> createAnnouncement(
	         @RequestPart("announcement") AnnouncementBoard announcement,
	         @RequestPart(value = "file", required = false) MultipartFile file) {

	     try {
	         if (file != null && !file.isEmpty()) {
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
	             announcement.setImgFile(uniqueFileName);
	         }

	         boolean isCreated = nService.enrollAnnouncement(announcement);
	         if (isCreated) {
	             return new ResponseEntity<>("게시물이 등록되었습니다.", HttpStatus.CREATED);
	         } else {
	             return new ResponseEntity<>("게시물 등록에 실패했습니다.", HttpStatus.BAD_REQUEST);
	         }
	     } catch (IOException e) {
	         return new ResponseEntity<>("파일 저장 중 오류 발생: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	     }
	 }

	

	// 게시글 수정 API
	    @PutMapping("/edit/{boardType}/{postNo}")
	    public ResponseEntity<String> editAnnouncement(
	            @PathVariable String boardType,
	            @PathVariable int postNo,
	            @RequestPart("announcement") AnnouncementBoard announcement,
	            @RequestPart(value = "file", required = false) MultipartFile[] files,  // 여러 파일을 배열로 받기
	            @RequestPart(value = "existingFiles", required = false) List<String> existingFiles) {  // 기존 파일들

	        // 기존 파일 처리 (파일을 업데이트할 때 사용)
	        if (existingFiles != null && !existingFiles.isEmpty()) {
	            // 기존 파일들을 처리하는 로직 (파일 덮어쓰기)
	            // 예시로 기존 파일을 DB에서 업데이트하거나, 삭제할 수 있음
	            announcement.setImgFile(existingFiles.get(0)); // 첫 번째 파일을 사용한다고 가정
	        }

	        // 새 파일 처리 (파일이 있을 경우 저장)
	        if (files != null && files.length > 0) {
	            StringBuilder savedFileNames = new StringBuilder();
	            for (MultipartFile file : files) {
	                String fileName = saveFile(file);  // FileUtils 클래스에서 파일 저장
	                savedFileNames.append(fileName).append(",");  // 저장된 파일 이름들
	            }
	            // 저장된 파일 이름들을 설정 (여러 개 파일일 경우 처리)
	            announcement.setImgFile(savedFileNames.toString());
	        }

	        // 게시글 수정 처리
	        boolean isUpdated = nService.editAnnouncement(postNo, announcement);

	        if (isUpdated) {
	            return ResponseEntity.ok("게시글이 성공적으로 수정되었습니다.");
	        } else {
	            return ResponseEntity.badRequest().body("게시글 수정에 실패했습니다.");
	        }
	    }

	 // 파일을 저장하는 메소드
	    public static String saveFile(MultipartFile file) {
	    	 // 파일 저장 경로 설정 (절대 경로 사용)
	        String uploadDir = "C:/workspace/joycodeme/jcm/src/main/resources/static/boardImg/";  // 환경에 맞게 설정

	        // 파일 이름에 UUID를 추가하여 고유한 이름을 생성
	        String originalFileName = file.getOriginalFilename();
	        String fileExtension = "";

	        // 파일 확장자 추출
	        if (originalFileName != null) {
	            int dotIndex = originalFileName.lastIndexOf(".");
	            if (dotIndex > 0) {
	                fileExtension = originalFileName.substring(dotIndex); // 확장자 추출
	            }
	        }

	        // UUID로 고유 파일명 생성
	        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

	        // 파일 경로 생성
	        Path filePath = Paths.get(uploadDir + uniqueFileName);

	        try {
	            // 디렉토리가 존재하지 않으면 생성
	            if (!Files.exists(filePath.getParent())) {
	                Files.createDirectories(filePath.getParent());
	            }

	            // 파일 저장
	            Files.write(filePath, file.getBytes());

	        } catch (Exception e) {
	            e.printStackTrace();
	            throw new RuntimeException("파일 저장 중 오류가 발생했습니다.");
	        }

	        // 저장된 파일의 이름을 반환 (상대 경로)
	        return uniqueFileName;
	 }
}




