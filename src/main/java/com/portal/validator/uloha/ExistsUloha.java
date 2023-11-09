package com.portal.validator.uloha;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy= ExistsUlohaValidator.class)
public @interface ExistsUloha {

    String message() default "Úloha s daným ID neexistuje";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
