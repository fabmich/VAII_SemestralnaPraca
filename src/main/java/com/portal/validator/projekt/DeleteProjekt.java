package com.portal.validator.projekt;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy= DeleteProjektValidator.class)
public @interface DeleteProjekt {
    String message() default "Projekt nemožno vymazať";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

}
