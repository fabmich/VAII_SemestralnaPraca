package com.portal.response;

import com.portal.entity.Uloha;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ZPUResponse {


    private UUID id;
    private UUID zamestnanecId;
    private UUID projektId;
    private UUID ulohaId;
}
