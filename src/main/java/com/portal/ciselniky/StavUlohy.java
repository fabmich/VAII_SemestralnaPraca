package com.portal.ciselniky;

import lombok.Getter;

@Getter
public enum StavUlohy {

    BACKLOG ("Backlog"),
    IN_PROGRESS ("In Progress"),
    CANCELED ("Canceled"),
    FINISHED ("Finished"),
    FOR_TESTING ("For Testing");


    private final String nazov;

    StavUlohy (String pNazov) {
        this.nazov = pNazov;
    }
}
