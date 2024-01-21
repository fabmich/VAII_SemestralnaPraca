package com.portal.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "files")
@Getter
@Setter
@RequiredArgsConstructor
@SuperBuilder
public class File {

    @Id
    @UuidGenerator
    private UUID id;

    private String name;

    private String type;

    @Lob
    private byte[] data;
}
