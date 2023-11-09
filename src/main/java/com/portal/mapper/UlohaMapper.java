package com.portal.mapper;


import com.portal.entity.Uloha;
import com.portal.response.GetUlohaResponse;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface UlohaMapper {

    GetUlohaResponse toGetUlohaResponse(Uloha uloha);
}
