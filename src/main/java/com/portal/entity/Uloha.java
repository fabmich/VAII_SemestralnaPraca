package com.portal.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.portal.ciselniky.StavUlohy;
import com.portal.ciselniky.Vrstva;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "uloha")
@Getter
@Setter
@Data
@RequiredArgsConstructor
@SuperBuilder
public class Uloha {

    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nazov;

    @Column(nullable = false)
    private OffsetDateTime datumVytvorenia;

    private String popis;

    @ManyToOne
//    @JoinColumn(name = "zamestnanec_id")
//    @JsonBackReference
    private Zamestnanec priradenyZamestnanec;

    @Column(nullable = false)
    private OffsetDateTime deadline;

    @Column
    private Vrstva vrstva;

    @Column
    private Double fixVersion;

    @ManyToOne
//    @JoinColumn(name = "zamestnanec_id")
//    @JsonBackReference
    private Zamestnanec zadavatel;


    private StavUlohy stavUlohy;

    private Integer cisloUlohy;
}
