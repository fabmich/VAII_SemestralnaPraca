package com.portal.controller;

import com.portal.request.SMSRequest;
import com.portal.request.SimpleEmailRequest;
import com.portal.service.EmailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


/**
 *
 * NENI CAST SP VAII, to som len mal ako proof of concept
 */

@RestController
@RequiredArgsConstructor
@Transactional
@RequestMapping("/sms")
public class SMSController {

    private final EmailService emailService;

    @RequestMapping(value = "/recieve", method = RequestMethod.POST, consumes="application/x-www-form-urlencoded")
    @ResponseBody
    public String recieveSMS(SMSRequest request) {

            var niecoPreDebug = "AAAAAA";

            //Medzi Kroky
            //SMS parse
            //validacie
            //Ulozenie do DAO...
            //Odoslanie na maily

        var req = new SimpleEmailRequest();
        req.setPrijmatel("fabko54321@gmail.com");
        req.setPredmet("LOG-01-MOTOR-2");
        req.setText(request.getText()
        );

            emailService.sendSimpleMessage(req);

            return "OK";

    }

    @PostMapping("/send-email")
    @ResponseStatus(HttpStatus.OK)
    public void sendEmail(@RequestBody SimpleEmailRequest request) {

        emailService.sendSimpleMessage(request);

    }

}
