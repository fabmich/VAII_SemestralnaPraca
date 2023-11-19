package com.portal.request.zamestnanec;


import com.portal.ciselniky.Pozicia;
import com.portal.ciselniky.TypZamestnanca;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
public class CreateZamestnanecRequest {

    private String meno;
    private String priezvisko;
    private Integer vek;

    private OffsetDateTime kontraktDo;

    private TypZamestnanca typZamestnanca;
    private Pozicia pozicia;
    private UUID fotkaZamestnanca;

}
