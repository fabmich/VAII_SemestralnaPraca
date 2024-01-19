package com.portal.mapper;

import com.portal.entity.Zamestnanec;
import com.portal.response.GetZamestnanecResponse;
import com.portal.response.ZamestnanecFindAllResponse;
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
}
