package com.portal.validator.projekt;

import com.portal.dao.ProjektDao;
import com.portal.response.projekt.ProjektFindAllResponse;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class ExistsProjektValidator implements ConstraintValidator<ExistsProjekt, UUID> {

    private final ProjektDao projektDao;


    @Override
    public boolean isValid(UUID uuid, ConstraintValidatorContext constraintValidatorContext) {
        return projektDao.existsById(uuid);
    }
}
