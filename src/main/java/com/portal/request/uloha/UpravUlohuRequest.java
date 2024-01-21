package com.portal.request.uloha;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.portal.ciselniky.StavUlohy;
import com.portal.ciselniky.Vrstva;
import com.portal.entity.Zamestnanec;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class UpravUlohuRequest {

    private String nazov;
    private String popis;
    private String nazovZakaznika;

    @JsonFormat(pattern = "dd.MM.yyyy")
    private Date deadline;

    private UUID priradenyZamestnanec;

    private UUID zadavatel;
    private Vrstva vrstva;
    private Double fixVersion;
    private StavUlohy stavUlohy;


}
