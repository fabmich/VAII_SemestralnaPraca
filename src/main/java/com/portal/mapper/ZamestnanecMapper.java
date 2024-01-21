package com.portal.mapper;

import com.portal.entity.Zamestnanec;
import com.portal.response.zamestnanec.GetZamestnanecResponse;
import com.portal.response.zamestnanec.ZamestnanecFindAllResponse;
import com.portal.response.zamestnanec.ZamestnanecFindAllSimpleResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface ZamestnanecMapper {

    GetZamestnanecResponse toGetZamestnanecResponse(Zamestnanec zamestnanec);


    @Mapping(target = "pozicia", source = "pozicia.nazov")
    @Mapping(target = "typZamestnanca", source = "typZamestnanca.nazov")
    ZamestnanecFindAllResponse toZamestnanecFindAllResponse(Zamestnanec zamestnanec);

    ZamestnanecFindAllSimpleResponse toZamestnanecFindAllSimpleResponse(Zamestnanec zamestnanec);
}
