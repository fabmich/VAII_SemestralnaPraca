package com.portal.service;


import com.portal.mail.CustomJavaMailSender;
import com.portal.request.SimpleEmailRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class EmailService {


    private final CustomJavaMailSender customJavaMailSender;




    public void sendSimpleMessage(SimpleEmailRequest request) {


        customJavaMailSender.sendSimpleMessage(
                request.getPrijmatel(),
                request.getPredmet(),
                request.getText()
        );

    }

}
