package com.portal.ciselniky;

import lombok.Getter;

@Getter
public enum Pozicia {

    PROGRAMATOR ("Programátor"),
    UCTOVNIK ("Účtovník"),
    SEF_PROGRAMATOROV("Šef programátorov"),
    CEO("CEO"),
    UPRATOVAC("Upratovač"),
    TESTER("Tester");

    private final String nazov;

    Pozicia (String pNazov) {
        this.nazov = pNazov;
    }
}
