package com.portal.request.projekt;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjektUpdateRequest {

    private String nazov;
    private String prefix;
    private String zakaznik;
    private String popis;
}
