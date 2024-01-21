package com.portal.response.zamestnanec;


import com.portal.ciselniky.Pozicia;
import com.portal.ciselniky.TypZamestnanca;
import com.portal.entity.File;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ZamestnanecFindAllResponse {
    private UUID id;

    private String meno;

    private String priezvisko;
    private String typZamestnanca;

    private String pozicia;
    private File fotkaZamestnanca;
}
