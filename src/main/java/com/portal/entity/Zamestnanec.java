package com.portal.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.portal.ciselniky.Pozicia;
import com.portal.ciselniky.TypZamestnanca;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.OffsetDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "zamestnanec")
@Getter
@Setter
@RequiredArgsConstructor
@SuperBuilder
public class  Zamestnanec {

    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String meno;

    @Column(nullable = false)
    private String priezvisko;

    @Column(nullable = false)
    private  Integer vek;

    private String displayName;

    @Column(nullable = false)
    private OffsetDateTime zamestnanyOd;

    @Column(nullable = false)
    private OffsetDateTime kontraktDo;

    @Column(nullable = false)
    private TypZamestnanca typZamestnanca;

    @Column(nullable = false)
    private Pozicia pozicia;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Uloha uloha;

    @OneToMany(mappedBy="priradenyZamestnanec")
    @JsonManagedReference
    private Set<Uloha> prideleneUlohy;

}
