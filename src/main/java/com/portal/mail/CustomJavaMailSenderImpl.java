package com.portal.mail;

import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

public class CustomJavaMailSenderImpl extends JavaMailSenderImpl implements CustomJavaMailSender {

    @Override
    public void sendSimpleMessage(String to, String subject, String text) {



        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("testovaciNoreplymail@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        send(message);
    }
}
