package com.portal.request;

import lombok.Getter;
import lombok.Setter;
/**
 *
 * NENI CAST SP VAII, to som len mal ako proof of concept
 */

@Getter
@Setter
public class SMSRequest {

    private String phone;

    private String text;

    private Integer time;
    private String sim;

    private String extra1;
    private String extra2;

}
