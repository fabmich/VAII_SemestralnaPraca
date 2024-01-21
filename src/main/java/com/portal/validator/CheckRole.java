package com.portal.validator;

import com.portal.ciselniky.Role;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import org.springframework.core.annotation.AliasFor;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy=CheckRoleValidator.class)
        public @interface CheckRole {

    Role[] value() default {};

    String message() default "Nemáte správne role pre túto akciu";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
