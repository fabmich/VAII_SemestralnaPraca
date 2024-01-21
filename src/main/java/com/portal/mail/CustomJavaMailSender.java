package com.portal.mail;

import org.springframework.mail.javamail.JavaMailSender;
/**
 *
 * NENI CAST SP VAII, to som len mal ako proof of concept
 */

public interface CustomJavaMailSender extends JavaMailSender {

    void sendSimpleMessage(String to,
                           String subject,
                           String text);

}
