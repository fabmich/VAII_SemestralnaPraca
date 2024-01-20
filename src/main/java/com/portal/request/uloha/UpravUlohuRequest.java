package com.portal.request.uloha;

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
    private Date deadline;

    private UUID priradenyZamestnanec;

    private UUID sefProjektu;


}
