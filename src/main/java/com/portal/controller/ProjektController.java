package com.portal.controller;


import com.portal.entity.Projekt;
import com.portal.service.ProjektService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/projekt")
@RequiredArgsConstructor
public class ProjektController {

    private final ProjektService projektService;


    @PostMapping("/find-all")
    @ResponseStatus(HttpStatus.OK)
    public List<Projekt> findAll() {
        return projektService.findAll();
    }

    @PostMapping("/save/{nazov}")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID createProjekt(@PathVariable String nazov) {

        return projektService.createProject(nazov);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Projekt getProjektById(@PathVariable UUID id) {
        return projektService.getById(id);
    }


    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable UUID id) {
        projektService.deleteProjekt(id);
    }

}
