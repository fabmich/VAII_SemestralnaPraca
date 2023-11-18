package com.portal.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "files")
@Getter
@Setter
@Data
@RequiredArgsConstructor
@SuperBuilder
public class File {

    @Id
    @UuidGenerator
    public String id;


    private String name;

    private String type;

    @Lob
    private byte[] data;
}
