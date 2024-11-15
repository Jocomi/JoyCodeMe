package com.jocomi.jcm.member.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.jocomi.jcm.model.vo.Member;
import com.jocomi.jcm.naver.model.vo.NaverProfile;
import com.jocomi.jcm.naver.response.NaverProfileResponse;
import com.jocomi.jcm.service.MemberService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@CrossOrigin(origins = "*")
@RestController
public class MemberController {
	
	private final MemberService mService;

	@Autowired
	public MemberController(MemberService mService) {
		this.mService = mService;
	}

	@ResponseBody
	@PostMapping(value = "/login", produces = "application/json;charset=UTF-8")
	public String loginMember(@RequestBody Member member) {
		Member loginMember = mService.loginMember(member);
		return new Gson().toJson(loginMember);
	}

	@ResponseBody
	@PostMapping(value = "/signup", produces = "application/json;charset=UTF-8")
	public String signupMember(@RequestBody Member member) {
	    log.info("Received signup data: {}", member);

	    // ID 중복 체크
	    if (mService.checkUserById(member.getMemberId()) > 0) {
	        return new Gson().toJson("중복된 아이디 입니다.");
	    }

	    // 이메일 중복 체크
	    if (mService.checkUserByEmail(member.getEmail()) > 0) {
	        return new Gson().toJson("중복된 이메일 입니다.");
	    }

	    // 전화번호 중복 체크
	    if (mService.checkUserByPhone(member.getPhone()) > 0) {	
	        return new Gson().toJson("중복된 전화번호 입니다.");
	    }

	    // 중복이 없으면 회원가입 진행
	    int result = mService.registerMember(member);
	    return result == 1 ? new Gson().toJson("회원가입에 성공했습니다.") : new Gson().toJson("회원가입에 실패했습니다.");
	}

	// 필드별 중복 확인 메서드
	@ResponseBody
	@PostMapping(value = "/checkUser", produces = "application/json;charset=UTF-8")
	public String checkUser(@RequestBody Map<String, String> checkData) {
	    String field = checkData.get("field");
	    String value = checkData.get("value");

	    int count = 0;
	    switch (field) {
	        case "id":
	            count = mService.checkUserById(value);
	            break;
	        case "email":
	            count = mService.checkUserByEmail(value);
	            break;
	        case "phone":
	            count = mService.checkUserByPhone(value);
	            break;
	        default:
	            throw new IllegalArgumentException("Invalid field: " + field);
	    }
	    return new Gson().toJson(count > 0); // true: 중복, false: 중복 아님
	}

	@ResponseBody
	@GetMapping(value = "/profile", produces = "application/json;charset=UTF-8")
	public String profile(@RequestParam("memberId") String memberId) {
		Member member = mService.memberProfile(memberId);
		if (member.getPImg() == null || member.getPImg().isEmpty()) {
			member.setPImg("/img/TEST.JPG");
		}
		return new Gson().toJson(member);
	}

	@ResponseBody
	@PostMapping(value = "/uploadProfileImage", produces = "application/json;charset=UTF-8")
	public String uploadProfileImage(
	        @RequestParam("file") MultipartFile file,
	        @RequestParam("memberId") String memberId) {

	    String frontendUploadDir = "C:\\Users\\user1\\Desktop\\새 폴더\\public\\img\\";
	    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	    try {
	        Path frontendPath = Paths.get(frontendUploadDir);
	        if (!Files.exists(frontendPath)) {
	            Files.createDirectories(frontendPath);
	        }

	        Path frontendFilePath = frontendPath.resolve(fileName);
	        file.transferTo(frontendFilePath.toFile());

	        Member member = mService.memberProfile(memberId);
	        if (member != null) {
	            member.setPImg(fileName);
	            int updateResult = mService.editProfile(member);

	            if (updateResult > 0) {
	                return new Gson().toJson(fileName);
	            } else {
	                log.error("DB 업데이트 실패");
	                return new Gson().toJson("db-fail");
	            }
	        } else {
	            return new Gson().toJson("member-not-found");
	        }
	    } catch (IOException e) {
	        log.error("IOException during file upload: ", e);
	        return new Gson().toJson("fail");
	    } catch (Exception e) {
	        log.error("Unexpected error during file upload: ", e);
	        return new Gson().toJson("fail");
	    }
	}

	@ResponseBody
	@PostMapping(value = "/editProfile", produces = "application/json;charset=UTF-8")
	public String editProfile(@RequestBody Member member) {
		int result = mService.editProfile(member);
		if (result > 0) {
			Member updatedMember = mService.memberProfile(member.getMemberId());
			return new Gson().toJson(updatedMember);
		} else {
			return new Gson().toJson("프로필 변경에 실패했습니다.");
		}
	}
	

	@PostMapping(value = "/api/auth/google", produces = "application/json;charset=UTF-8")
	public String googleLogin(@RequestBody Map<String, String> payload) {
	    try {
	        String token = payload.get("token");
	        String[] splitToken = token.split("\\.");
	        String payloadJson = new String(Base64.getUrlDecoder().decode(splitToken[1]));
	        JSONObject claims = new JSONObject(payloadJson);

	        Member member = new Member();
	        member.setMemberId(claims.getString("sub"));
	        member.setEmail(claims.getString("email"));
	        member.setMemberName(claims.optString("name", "Unknown"));
	        member.setPImg(claims.optString("picture", "/img/default-profile.png"));
	        member.setMemberPwd("default_password"); // 기본 비밀번호 설정

	        // 전화번호 확인 및 기본값 설정
	        String phoneNumber = claims.optString("phone_number", null);
	        if (phoneNumber == null) {
	            phoneNumber = "010-0000-0000"; // 기본 전화번호 설정
	        }
	        member.setPhone(phoneNumber);

	        if (mService.checkUserById(member.getMemberId()) == 0) {
	            mService.registerMember(member); // 신규 사용자 등록
	        }

	        return new Gson().toJson(member);
	    } catch (Exception e) {
	        log.error("Google login error:", e);
	        return new Gson().toJson("Google 로그인에 실패했습니다.");
	    }
	}
	
	@ResponseBody
	@PostMapping(value = "/api/naver/callback", produces = "application/json;charset=UTF-8")
	public String naverCallback(@RequestBody Map<String, String> data, HttpSession session) {
		 	String access_token = data.get("access_token");
	        String state = data.get("state");

	        System.out.println("Access Token: " + access_token + ", State: " + state);

	        if (access_token == null || access_token.isEmpty()) {
	            return "Access Token이 제공되지 않았습니다.";
	        }

	        try {
	            // Access Token을 사용하여 사용자 정보 조회
	            NaverProfile profile = getNaverUserProfile(access_token);

	            if (profile == null) {
	                return "사용자 정보를 가져오는 데 실패했습니다.";
	            }

	            // 사용자 정보 저장 또는 업데이트
	            Member member = new Member();
	            member.setMemberId(profile.getId());
	            member.setEmail(profile.getEmail());
	            member.setMemberName(profile.getName());
	            member.setPhone(profile.getMobile());
	            member.setPImg(profile.getProfile_image());
	            // 임시 비밀번호 생성 및 인코딩

	            System.out.println("Member Info: " + member);

	            if (mService.checkUserById(member.getMemberId()) == 0) {
	                mService.registerNaverMember(member);
	            } else {
	                mService.editNaverProfile(member);
	            }

	            
	            return new Gson().toJson(member);
	        } catch (Exception e) {
	            e.printStackTrace();
	            return "네이버 로그인 처리 중 오류가 발생했습니다: " + e.getMessage();
	        }
	    }
	
	private NaverProfile getNaverUserProfile(String accessToken) throws Exception {
		String url = "https://openapi.naver.com/v1/nid/me";

	    RestTemplate restTemplate = new RestTemplate();

	    // 헤더 설정
	    HttpHeaders headers = new HttpHeaders();
	    headers.add("Authorization", "Bearer " + accessToken);

	    HttpEntity<String> request = new HttpEntity<>("", headers); // GET 요청에는 body가 필요 없음

	    // 사용자 정보 요청
	    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class); // 수정된 부분
	    if (response.getStatusCode() == HttpStatus.OK) {
	        ObjectMapper objectMapper = new ObjectMapper();
	        NaverProfileResponse profileResponse = objectMapper.readValue(response.getBody(), NaverProfileResponse.class);
	        if ("00".equals(profileResponse.getResultcode())) { // 네이버 API 응답의 resultcode는 "00"이어야 성공
	            return profileResponse.getResponse();
	        } else {
	            throw new Exception("사용자 정보 조회 실패: " + profileResponse.getMessage());
	        }
	    } else {
	        throw new Exception("사용자 정보 요청 실패: HTTP " + response.getStatusCode());
	    }
	}

}
