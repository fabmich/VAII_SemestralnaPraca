package com.portal.validator.projekt;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy= ExistsProjektValidator.class)
public @interface ExistsProjekt {
    String message() default "Projekt s daným ID neexistuje";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

}
