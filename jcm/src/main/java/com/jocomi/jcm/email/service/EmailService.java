package com.jocomi.jcm.email.service;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.stereotype.Service;
@Service
public class EmailService {

    // 이메일 서버 설정
    private final String host = "smtp.gmail.com";
    private final int port = 465;
    private final String username = "ljw1031801@gmail.com";
    private final String password = "";

    public boolean sendEmail(String to, String subject, String message) {
        try {
            HtmlEmail email = new HtmlEmail();
            email.setHostName(host);
            email.setSmtpPort(port);
            email.setAuthenticator(new DefaultAuthenticator(username, password));
            email.setSSL(true);
            email.setCharset("UTF-8");
            email.setFrom(username, "Joy Code Me");
            email.setSubject(subject);
            email.setHtmlMsg(message);
            email.addTo(to);
            email.send();
            return true;
        } catch (EmailException e) {
            e.printStackTrace();
            return false;
        }
    }
}

