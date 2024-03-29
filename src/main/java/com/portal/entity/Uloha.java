package com.portal.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.portal.ciselniky.StavUlohy;
import com.portal.ciselniky.Vrstva;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "uloha")
@Getter
@Setter
@RequiredArgsConstructor
@SuperBuilder
public class Uloha {

    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nazov;

    @Column(nullable = false)
    private LocalDateTime datumVytvorenia;

    private String popis;


    @Column(nullable = false)
    private Date deadline;

    @Column
    private Vrstva vrstva;

    @Column
    private Double fixVersion;

    @ManyToOne
    @JoinColumn(name = "zamestnanec_id")
//    @JsonBackReference
    private Zamestnanec zadavatel;


    private StavUlohy stavUlohy;

    private Long cisloUlohy;

    private String prefix;

    @OneToOne(mappedBy = "uloha", cascade = {CascadeType.ALL})
    @JsonIgnore
    private ZPU zpu;
}
