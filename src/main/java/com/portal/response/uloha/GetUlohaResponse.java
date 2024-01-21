package com.portal.response.uloha;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.portal.ciselniky.Vrstva;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
public class GetUlohaResponse {

    private UUID id;

    private String nazov;

    @JsonFormat(pattern = "dd.MM.yyyy HH:mm:SS")
    private LocalDateTime datumVytvorenia;
    private String popis;

    @JsonFormat(pattern = "dd.MM.yyyy")
    private Date deadline;

    private Integer fixVersion;
    private Vrstva vrstva;


    private UUID zadavatelId;
    private String menoPriezviskoZadavatela;

    private UUID priradenyZamestnanecId;
    private String menoPriezviskoPriradenehoZamestnanca;
    private String stavUlohy;
    private String cisloUlohy;
}
