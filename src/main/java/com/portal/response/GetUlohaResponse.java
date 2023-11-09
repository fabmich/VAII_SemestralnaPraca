package com.portal.response;

import com.portal.ciselniky.Vrstva;
import com.portal.entity.Zamestnanec;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
public class GetUlohaResponse {

    private UUID id;

    private String nazov;
    private OffsetDateTime datumVytvorenia;
    private String popis;

    private OffsetDateTime deadline;

    private Integer fixVersion;
    private Vrstva vrstva;


    private Zamestnanec sefProjektu;
    private Zamestnanec priradenyZamestnanec;
}
