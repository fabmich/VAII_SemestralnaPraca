package com.portal.response.uloha;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.portal.ciselniky.StavUlohy;
import com.portal.ciselniky.Vrstva;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
public class UlohaFindAllResponse {

    private UUID id;
    private String nazov;
    private Vrstva vrstva;

    @JsonFormat(pattern = "dd.MM.yyyy")
    private Date deadline;

    private StavUlohy stavUlohy;
    private String prefix;
    private Long cisloUlohy;

}


