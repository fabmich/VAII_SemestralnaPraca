package com.portal.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.portal.ciselniky.StavUlohy;
import com.portal.ciselniky.Vrstva;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;
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
    private LocalDateTime deadline;

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

    @OneToMany(mappedBy = "uloha", cascade = {CascadeType.ALL})
    @JsonIgnore
    private Set<ZPU> zpu;
}
