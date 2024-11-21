package com.jocomi.jcm.service;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtils {
    // 비밀번호 암호화
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    // 비밀번호 확인
    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        if (plainPassword == null || hashedPassword == null) {
            return false;
        }
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }
}
