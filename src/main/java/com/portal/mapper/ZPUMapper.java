package com.portal.mapper;


import com.portal.entity.ZPU;
import com.portal.response.ZPUResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface ZPUMapper {

    @Mapping(target = "zamestnanecId", source = "zpu.zamestnanec.id")
    @Mapping(target = "projektId", source = "zpu.projekt.id")
    @Mapping(target = "ulohaId", source = "zpu.uloha.id")
    ZPUResponse toZPUResponse(ZPU zpu);
}
