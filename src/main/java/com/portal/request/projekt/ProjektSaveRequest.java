package com.portal.request.projekt;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjektSaveRequest {

    private String nazov;

    private String popis;

    private String zakaznik;
    private String prefix;
}
