package com.portal.request;

import lombok.Getter;
import lombok.Setter;

/**
 *
 * NENI CAST SP VAII, to som len mal ako proof of concept
 */

@Getter
@Setter
public class SimpleEmailRequest {


    private String prijmatel;
    private String predmet;
    private String text;
}
