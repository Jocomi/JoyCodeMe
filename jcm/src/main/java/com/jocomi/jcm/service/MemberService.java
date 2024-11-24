package com.jocomi.jcm.service;


import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.jocomi.jcm.email.service.EmailService;
import com.jocomi.jcm.model.mapper.MemberMapper;
import com.jocomi.jcm.model.vo.Member;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberMapper mMapper;
    private final HttpSession session;
    private final EmailService emailService;
    private final Map<String, String> verificationCodeStore = new ConcurrentHashMap<>();
    private final Map<String, String> emailVerificationStore = new ConcurrentHashMap<>();


    public Member loginMember(Member member) {
        Member storedMember = mMapper.memberProfile(member.getMemberId());
        if (storedMember != null && PasswordUtils.checkPassword(member.getMemberPwd(), storedMember.getMemberPwd())) {
            return storedMember;
        }
        return null; // 로그인 실패
    }



	// 회원가입 기능 유지 (필요 시 사용 가능)
    public int registerMember(Member member) {
        // 비밀번호 암호화
        return mMapper.insertMember(member);
    }


	// ID 중복 체크 메서드
    public int checkUserById(String id) {
        return mMapper.checkUserById(id);
    }

    // 이메일 중복 체크 메서드
    public int checkUserByEmail(String email) {
        return mMapper.checkUserByEmail(email);
    }

    // 전화번호 중복 체크 메서드
    public int checkUserByPhone(String phone) {
        return mMapper.checkUserByPhone(phone);
    }

	// 회원 ID 조회 메서드
	public int selectId(Member member) {
		return mMapper.selectId(member.getMemberId());
	}

	// 회원 정보 조회 메서드
	public Member memberProfile(String memberId) {
		return mMapper.memberProfile(memberId);
	}

	// 회원 정보 수정 메서드
	public int editProfile(Member member) {
		return mMapper.editProfile(member);
	}
	public int updateProfileImage(String memberId, String imagePath) {
	    return mMapper.updateProfileImage(memberId, imagePath);
	}
	
	public int registerNaverMember(Member member) {
		return mMapper.insertNaverMember(member);
	}

	public int editNaverProfile(Member member) {
		return mMapper.editNaverProfile(member);
	}
	
	// 비밀번호 변경
	 public String changePassword(String memberId, String currentPwd, String newPwd) {
	        Member member = mMapper.memberProfile(memberId);
	        if (member == null || !PasswordUtils.checkPassword(currentPwd, member.getMemberPwd())) {
	            return "현재 비밀번호가 틀렸습니다.";
	 }

	    // 새로운 비밀번호 암호화 후 업데이트
	    member.setMemberPwd(PasswordUtils.hashPassword(newPwd));
	    int result = mMapper.updatePassword(member);
	    return result > 0 ? "비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요." : "비밀번호 변경에 실패했습니다.";
	}

	
	public Member getLatestPayProduct(String memberId) {
	    return mMapper.getLatestPayProduct(memberId);
	}
	
	public String findId(String email, String phone) {
	    return mMapper.findIdByEmailAndPhone(Map.of("email", email, "phone", phone));
	}

	public String setPassword(String memberId, String newPassword) {
	    if (memberId == null || newPassword == null) {
	        throw new IllegalArgumentException("memberId 또는 newPassword가 null입니다.");
	    }

	    String hashedPassword = PasswordUtils.hashPassword(newPassword);
	    if (hashedPassword == null) {
	        throw new IllegalStateException("hashedPassword가 null입니다.");
	    }

	    int result = mMapper.setPassword(Map.of("memberId", memberId, "memberPwd", hashedPassword));
	    return result > 0 ? "비밀번호가 성공적으로 변경되었습니다." : "비밀번호 변경에 실패했습니다.";
	}


    public String generateVerificationCode(String memberId) {
        String code = String.valueOf(new Random().nextInt(900000) + 100000); // 6자리 랜덤값 생성
        verificationCodeStore.put(memberId, code);
        return code;
    }

    public boolean sendVerificationCode(String email, String verificationCode) {
        String subject = "비밀번호 재설정 요청 Code";
        String message = "<!DOCTYPE html>" +
                "<html lang='ko'>" +
                "<head>" +
                "<meta charset='UTF-8'>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                "<title>이메일 인증 코드</title>" +
                "</head>" +
                "<body style='font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;'>" +
                "<div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);'>" +
                "<div style='text-align: center; background-color: #4CAF50; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;'>" +
                "<h1 style='margin: 0; font-size: 24px;'>이메일 인증 코드</h1>" +
                "</div>" +
                "<div style='padding: 20px; color: #333333;'>" +
                "<p style='font-size: 16px; line-height: 1.6;'>안녕하세요,</p>" +
                "<p style='font-size: 16px; line-height: 1.6;'>비밀번호를 변경하기 이메일 인증이 필요합니다. 아래의 인증 코드를 사용하여 계속 진행해 주세요:</p>" +
                "<div style='text-align: center; background-color: #f0f0f0; padding: 15px; font-size: 24px; letter-spacing: 4px; border-radius: 8px; margin: 20px 0; font-weight: bold;'>" + verificationCode + "</div>" +
                "<p style='font-size: 16px; line-height: 1.6;'>이 인증 코드는 10분 동안 유효합니다. 만약 요청하지 않았다면, 이 메일을 무시해 주세요.</p>" +
                "<p style='font-size: 16px; line-height: 1.6;'>감사합니다,<br>Joy Code Me</p>" +
                "</div>" +
                "<div style='text-align: center; font-size: 12px; color: #888888; padding: 10px; border-top: 1px solid #dddddd;'>" +
                "<p>문의사항이 있으시면 언제든 <a href='mailto:ljw1031801@gmail.com' style='color: #4CAF50; text-decoration: none;'>ljw1031801@gmail.com</a>으로 연락해 주세요.</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
        return emailService.sendEmail(email, subject, message);
    }


    public boolean verifyCode(String memberId, String code) {
        String storedCode = verificationCodeStore.get(memberId); // 저장된 코드 조회
        if (storedCode != null && storedCode.equals(code)) {
            verificationCodeStore.remove(memberId); // 인증 완료 후 코드 삭제
            return true;
        }
        return false;
    }
    
    // 인증 코드 생성
    public String createVerificationCodeForEmail(String email) {
        String code = String.valueOf(new Random().nextInt(900000) + 100000); // 6자리 난수
        emailVerificationStore.put(email, code);
        return code;
    }

    // 이메일로 인증 코드 전송
    public boolean sendCodeToEmail(String email, String verificationCode) {
        String subject = "이메일 인증 코드";
        String message = "<!DOCTYPE html>" +
                "<html lang='ko'>" +
                "<head>" +
                "<meta charset='UTF-8'>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                "<title>이메일 인증 코드</title>" +
                "</head>" +
                "<body style='font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;'>" +
                "<div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);'>" +
                "<div style='text-align: center; background-color: #4CAF50; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;'>" +
                "<h1 style='margin: 0; font-size: 24px;'>이메일 인증 코드</h1>" +
                "</div>" +
                "<div style='padding: 20px; color: #333333;'>" +
                "<p style='font-size: 16px; line-height: 1.6;'>안녕하세요,</p>" +
                "<p style='font-size: 16px; line-height: 1.6;'>비밀번호를 변경하기 이메일 인증이 필요합니다. 아래의 인증 코드를 사용하여 계속 진행해 주세요:</p>" +
                "<div style='text-align: center; background-color: #f0f0f0; padding: 15px; font-size: 24px; letter-spacing: 4px; border-radius: 8px; margin: 20px 0; font-weight: bold;'>" + verificationCode + "</div>" +
                "<p style='font-size: 16px; line-height: 1.6;'>이 인증 코드는 10분 동안 유효합니다. 만약 요청하지 않았다면, 이 메일을 무시해 주세요.</p>" +
                "<p style='font-size: 16px; line-height: 1.6;'>감사합니다,<br>Joy Code Me</p>" +
                "</div>" +
                "<div style='text-align: center; font-size: 12px; color: #888888; padding: 10px; border-top: 1px solid #dddddd;'>" +
                "<p>문의사항이 있으시면 언제든 <a href='mailto:ljw1031801@gmail.com' style='color: #4CAF50; text-decoration: none;'>ljw1031801@gmail.com</a>으로 연락해 주세요.</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
        return emailService.sendEmail(email, subject, message);
    }

    // 인증 코드 검증
    public boolean validateEmailCode(String email, String code) {
        String storedCode = emailVerificationStore.get(email);
        if (storedCode != null && storedCode.equals(code)) {
            emailVerificationStore.remove(email); // 검증 완료 후 삭제
            return true;
        }
        return false;
    }

}

