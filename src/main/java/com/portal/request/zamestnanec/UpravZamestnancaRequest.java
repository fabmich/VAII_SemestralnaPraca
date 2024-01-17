package com.portal.request.zamestnanec;

import com.portal.ciselniky.Pozicia;
import com.portal.ciselniky.TypZamestnanca;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Getter
@Setter
public class UpravZamestnancaRequest {

    private String meno;
    private String priezvisko;
    private Integer vek;

    private LocalDate kontraktDo;

    private TypZamestnanca typZamestnanca;
    private Pozicia pozicia;
    private String telefonneCislo;
    private String email;
}
