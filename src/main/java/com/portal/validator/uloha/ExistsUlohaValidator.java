package com.portal.validator.uloha;

import com.portal.dao.UlohaDao;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class ExistsUlohaValidator implements ConstraintValidator<ExistsUloha, UUID> {

    private final UlohaDao ulohaDao;

    @Override
    public boolean isValid(UUID id, ConstraintValidatorContext context) {
        return ulohaDao.existsById(id);
    }
}
