package com.portal.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.portal.ciselniky.Pozicia;
import com.portal.ciselniky.TypZamestnanca;
import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;

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

    @Column(nullable = false, length = 64)
    private String meno;

    @Column(nullable = false, length = 64)
    private String priezvisko;

    @Column(nullable = false)
    private  Integer vek;

    @Column(unique = true, length = 64)
    private String displayName;

    @Column(nullable = false, unique = true, length = 20)
    private String telefonneCislo;

    @Column(nullable = false, unique = true, length = 254)
    private String email;

    @Column(nullable = false)
    private OffsetDateTime zamestnanyOd;

    @Column(nullable = false)
    private OffsetDateTime kontraktDo;

    @Column(nullable = false)
    private TypZamestnanca typZamestnanca;

    @Column(nullable = false)
    private Pozicia pozicia;

    //TODO zmenit na Projekt
    @ManyToOne
    @JoinColumn(name = "uloha_id")
    @JsonBackReference
    private Uloha uloha;

    @OneToMany(mappedBy="priradenyZamestnanec")
    @JsonBackReference
    private Set<Uloha> prideleneUlohy;

    @OneToOne
    @JoinColumn(name = "file_id")
    private File fotkaZamestnanca;
}
