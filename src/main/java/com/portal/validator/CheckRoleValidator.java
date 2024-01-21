package com.portal.validator;

import com.portal.ciselniky.Role;
import com.portal.utils.JWTParserUtil;
import com.portal.utils.RoleCheckerUtil;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class CheckRoleValidator implements ConstraintValidator<CheckRole, String> {

    private Role[] allowedRoles;

    @Override
    public void initialize(CheckRole checkRole) {
        this.allowedRoles = checkRole.value();
    }

    @Override
    public boolean isValid(String token, ConstraintValidatorContext context) {
        var prijateRole = JWTParserUtil.ParseAndgetRoles(token);
        return RoleCheckerUtil.checkRoles(prijateRole, Arrays.stream(this.allowedRoles).toList());


    }
}
