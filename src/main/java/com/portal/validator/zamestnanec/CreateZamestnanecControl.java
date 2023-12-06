package com.portal.validator.zamestnanec;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy= CreateZamestnanecValidator.class)
        public @interface CreateZamestnanecControl {

        String message() default "Zamestnanec s cislom alebo emailom alebo displayname uz existuje!";

        Class<?>[] groups() default { };

        Class<? extends Payload>[] payload() default { };
}
