package com.portal.ciselniky;

import lombok.Getter;

@Getter
public enum TypZamestnanca {

    TPP ("Trvalý pracovný pomer"),
    DOHODAR ("Dohodár");

    private final String nazov;

    TypZamestnanca (String pNazov) {
        this.nazov = pNazov;
    }
}
