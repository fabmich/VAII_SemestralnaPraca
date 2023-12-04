package com.portal.request.zamestnanec;


import com.portal.ciselniky.Pozicia;
import com.portal.ciselniky.TypZamestnanca;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
@Validated
public class CreateZamestnanecRequest {



    @NotEmpty
    private String meno;

    @NotNull
    private String priezvisko;

    @Min(1)
    @Max(120)
    private Integer vek;

    private OffsetDateTime kontraktDo;

    private TypZamestnanca typZamestnanca;

    private Pozicia pozicia;

    private UUID fotkaZamestnanca;

}
