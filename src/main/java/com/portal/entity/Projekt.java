package com.portal.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.portal.ciselniky.Pozicia;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "projekt")
@Getter
@Setter
@RequiredArgsConstructor
@SuperBuilder
public class Projekt {

    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private UUID id;


    @Column(nullable = false)
    private String nazov;

    private String prefix;

    @Column(nullable = false)
    private LocalDateTime datumVytvorenia;

    private String popis;


    private String zakaznik;


    @OneToMany(mappedBy = "projekt", cascade = {CascadeType.ALL})
    @JsonIgnore
    private Set<ZPU> zpu;

}
