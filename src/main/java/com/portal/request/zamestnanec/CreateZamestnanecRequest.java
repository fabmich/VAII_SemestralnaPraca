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



    @NotEmpty(message = "Meno je povinné")
    private String meno;

    @NotEmpty(message = "Priezvisko je povinné")
    private String priezvisko;

    @Min(value = 1, message = "Vek je menej ako 1")
    @Max(value = 120, message = "Vek presiahol hornú hranicu")
    @NotNull(message = "Vek je povinný")
    private Integer vek;

    private OffsetDateTime kontraktDo;

    private TypZamestnanca typZamestnanca;

    private Pozicia pozicia;

    private UUID fotkaZamestnanca;

}
