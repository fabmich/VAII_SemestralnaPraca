package com.portal.response.uloha;

import com.portal.ciselniky.Vrstva;
import com.portal.entity.Zamestnanec;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
public class GetUlohaResponse {

    private UUID id;

    private String nazov;
    private LocalDateTime datumVytvorenia;
    private String popis;

    private LocalDateTime deadline;

    private Integer fixVersion;
    private Vrstva vrstva;


    private UUID zadavatelId;
    private UUID priradenyZamestnanecId;
    private String stavUlohy;
}
