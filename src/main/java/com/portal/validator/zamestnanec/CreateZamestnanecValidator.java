package com.portal.validator.zamestnanec;

import com.portal.dao.ZamestnanecDao;
import com.portal.request.zamestnanec.CreateZamestnanecRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CreateZamestnanecValidator implements ConstraintValidator<CreateZamestnanecControl,CreateZamestnanecRequest> {

    private final ZamestnanecDao zamestnanecDao;

    @Override
    public boolean isValid(CreateZamestnanecRequest request, ConstraintValidatorContext constraintValidatorContext) {
        return zamestnanecDao.findByEmailOrTelefonneCisloOrDisplayName(request.getEmail(), request.getTelefonneCislo(), "") == null;
    }
}
