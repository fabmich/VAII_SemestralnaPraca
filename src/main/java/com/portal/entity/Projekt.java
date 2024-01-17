package com.portal.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Data
@RequiredArgsConstructor
@SuperBuilder
public class Projekt {

    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private UUID id;


    @Column(nullable = false)
    private String nazov;



    @Column(nullable = false)
    private LocalDateTime datumVytvorenia;

    private String popis;


    private String zakaznik;

//    @ManyToMany
//    private Set<Zamestnanec> priradenyZamestnanci;

    @OneToMany(mappedBy = "projekt", cascade = {CascadeType.ALL})
    @JsonManagedReference
    private Set<ZPU> zpu;
}
