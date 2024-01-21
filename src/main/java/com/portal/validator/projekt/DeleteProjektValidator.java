package com.portal.validator.projekt;

import com.portal.dao.ProjektDao;
import com.portal.dao.UlohaDao;
import com.portal.dao.ZPUDao;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class DeleteProjektValidator implements ConstraintValidator<DeleteProjekt, UUID> {


    private final ProjektDao projektDao;
    private final ZPUDao zpuDao;

    @Override
    public boolean isValid(UUID uuid, ConstraintValidatorContext constraintValidatorContext) {



        return projektDao.existsById(uuid) && !zpuDao.existsByProjektId(uuid) ;
    }
}
