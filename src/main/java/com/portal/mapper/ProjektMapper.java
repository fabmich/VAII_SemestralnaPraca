package com.portal.mapper;

import com.portal.entity.Projekt;
import com.portal.response.projekt.ProjektFindAllResponse;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface ProjektMapper {


    ProjektFindAllResponse toProjektFindAllResponse(Projekt projekt);
}
