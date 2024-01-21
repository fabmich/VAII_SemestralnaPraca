package com.portal.mapper;


import com.portal.entity.Uloha;
import com.portal.response.uloha.GetUlohaResponse;
import com.portal.response.uloha.UlohaFindAllResponse;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface UlohaMapper {


//    @Mapping(target = "priradenyZamestnanecId", source = "uloha.priradenyZamestnanec.id")
    @Mapping(target = "zadavatelId", source = "uloha.zadavatel.id")
    @Mapping(target = "stavUlohy", source = "uloha.stavUlohy")
    GetUlohaResponse toGetUlohaResponse(Uloha uloha);

    UlohaFindAllResponse toUlohaFindAllResponse(Uloha uloha);

}
