package com.portal.mapper;


import com.portal.entity.Uloha;
import com.portal.response.GetUlohaResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface UlohaMapper {


//    @Mapping(target = "priradenyZamestnanecId", source = "uloha.priradenyZamestnanec.id")
    @Mapping(target = "zadavatelId", source = "uloha.zadavatel.id")
    @Mapping(target = "stavUlohy", source = "uloha.stavUlohy.nazov")
    GetUlohaResponse toGetUlohaResponse(Uloha uloha);
}
