package com.portal.response.projekt;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ProjektFindAllResponse {

    private UUID id;
    private String nazov;
    private String prefix;
    private String zakaznik;
    private String popis;
}
