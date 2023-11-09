package com.portal.mapper;

import com.portal.entity.Zamestnanec;
import com.portal.response.GetZamestnanecResponse;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface ZamestnanecMapper {

    GetZamestnanecResponse toGetZamestnanecResponse(Zamestnanec zamestnanec);
}
