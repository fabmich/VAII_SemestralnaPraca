package com.portal.response.zamestnanec;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ZamestnanecFindAllSimpleResponse {

    private UUID id;

    private String meno;

    private String priezvisko;

}
