package com.portal.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Entity
@Table(name = "zpu")
@Getter
@Setter
@RequiredArgsConstructor
@SuperBuilder
public class ZPU {

    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private UUID id;


    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "zamestnanec_id")
    private Zamestnanec zamestnanec;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "projekt_id")
    private Projekt projekt;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "uloha_id")
    private Uloha uloha;
}
