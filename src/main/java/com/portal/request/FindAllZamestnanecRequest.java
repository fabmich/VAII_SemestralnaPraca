package com.portal.request;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.portal.ciselniky.Pozicia;
import com.portal.ciselniky.TypZamestnanca;
import com.portal.entity.Uloha;
import jakarta.persistence.*;

import java.time.OffsetDateTime;
import java.util.Set;
import java.util.UUID;

public class FindAllZamestnanecRequest {

    private UUID id;

    private String meno;

    private String priezvisko;

    private  Integer vek;

    private String displayName;

    private OffsetDateTime zamestnanyOd;

    private OffsetDateTime kontraktDo;

    private TypZamestnanca typZamestnanca;

    private Pozicia pozicia;

    private Uloha uloha;

    private Set<Uloha> prideleneUlohy;
}
