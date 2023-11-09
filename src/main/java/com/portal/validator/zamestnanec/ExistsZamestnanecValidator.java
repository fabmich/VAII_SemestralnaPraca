package com.portal.validator.zamestnanec;

import com.portal.dao.ZamestnanecDao;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class ExistsZamestnanecValidator implements ConstraintValidator<ExistsZamestnanec, UUID> {

    private final ZamestnanecDao zamestnanecDao;

    @Override
    public boolean isValid(UUID id, ConstraintValidatorContext context) {
        return zamestnanecDao.existsById(id);
    }
}
