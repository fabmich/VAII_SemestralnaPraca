package com.portal.response.uloha;

import com.portal.ciselniky.StavUlohy;
import com.portal.ciselniky.Vrstva;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UlohaFindAllResponse {

    private UUID id;
    private String nazov;
    private Vrstva vrstva;
    private String deadline;
    private StavUlohy stavUlohy;
    private String prefix;
    private Long cisloUlohy;

}


