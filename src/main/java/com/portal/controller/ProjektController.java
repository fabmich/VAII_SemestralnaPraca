package com.portal.controller;


import com.portal.ciselniky.Role;
import com.portal.entity.Projekt;
import com.portal.request.projekt.ProjektSaveRequest;
import com.portal.request.projekt.ProjektUpdateRequest;
import com.portal.response.projekt.ProjektFindAllResponse;
import com.portal.service.ProjektService;
import com.portal.validator.CheckRole;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/projekt")
@RequiredArgsConstructor
public class ProjektController {

    private final ProjektService projektService;


    @PostMapping("/find-all")
    @ResponseStatus(HttpStatus.OK)
    public Set<ProjektFindAllResponse> findAll() {
        return projektService.findAll();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID createProjekt(@RequestBody ProjektSaveRequest request, @RequestHeader("Authorization") @CheckRole({Role.ROLA_SPRAVCA_PROJEKTOV}) String  token) {

        return projektService.createProject(request);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Projekt getProjektById(@PathVariable UUID id) {
        return projektService.getById(id);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable UUID id, @RequestHeader("Authorization") @CheckRole({Role.ROLA_SPRAVCA_PROJEKTOV}) String  token) {
        projektService.deleteProjekt(id);
    }


    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable UUID id, @RequestBody ProjektUpdateRequest request, @RequestHeader("Authorization") @CheckRole({Role.ROLA_SPRAVCA_PROJEKTOV}) String  token) {
        projektService.update(id, request);
    }

}
