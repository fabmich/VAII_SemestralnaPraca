package com.portal.request.uloha;


import com.portal.ciselniky.Vrstva;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
public class CreateUlohaRequest {

    private String nazov;

    private String popis;

    private UUID priradenyZamestnanec;


    private OffsetDateTime deadline;

    private UUID sefProjektu;


    private Vrstva vrstva;

    private Integer fixVersion;


}
