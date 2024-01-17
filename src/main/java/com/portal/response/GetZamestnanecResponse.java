package com.portal.response;

import com.portal.ciselniky.Pozicia;
import com.portal.ciselniky.TypZamestnanca;
import com.portal.entity.Uloha;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
public class GetZamestnanecResponse {

    private UUID id;

    private String meno;

    private String priezvisko;

    private  Integer vek;

    private String displayName;

    private LocalDate zamestnanyOd;

    private TypZamestnanca typZamestnanca;

    private Pozicia pozicia;

//    private Uloha uloha;

    private String telefonneCislo;
    private String email;

}
