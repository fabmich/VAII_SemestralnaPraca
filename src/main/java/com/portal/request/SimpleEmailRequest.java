package com.portal.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimpleEmailRequest {


    private String prijmatel;
    private String predmet;
    private String text;
}
