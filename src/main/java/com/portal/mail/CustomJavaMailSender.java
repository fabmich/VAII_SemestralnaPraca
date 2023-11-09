package com.portal.mail;

import org.springframework.mail.javamail.JavaMailSender;

public interface CustomJavaMailSender extends JavaMailSender {

    void sendSimpleMessage(String to,
                           String subject,
                           String text);

}
