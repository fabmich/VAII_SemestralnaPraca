package com.portal.mail;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import java.util.Properties;
/**
 *
 * NENI CAST SP VAII, to som len mal ako proof of concept
 */

@Configuration
@Component
public class MailConfig {

    @Bean
    public CustomJavaMailSender getCustomJavaMailSender() {
        CustomJavaMailSenderImpl mailSender = new CustomJavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("testovacinoreplymail@gmail.com");
        mailSender.setPassword("hbpo wrua mjay tzaf"); //nastavene v google Hesla aplikacii

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
