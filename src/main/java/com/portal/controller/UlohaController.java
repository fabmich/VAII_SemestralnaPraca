package com.portal.controller;


import com.portal.ciselniky.Role;
import com.portal.request.uloha.CreateUlohaRequest;
import com.portal.request.uloha.UlohaFindAllRequest;
import com.portal.request.uloha.UpravUlohuRequest;
import com.portal.response.uloha.GetUlohaResponse;
import com.portal.response.uloha.UlohaFindAllResponse;
import com.portal.service.UlohaService;
import com.portal.validator.CheckRole;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Transactional
@RequestMapping("/uloha")
@Validated
public class UlohaController {

    private final UlohaService ulohaService;

    @PostMapping("/find-all")
    public Page<UlohaFindAllResponse> findAll(@RequestBody UlohaFindAllRequest request) {
        return ulohaService.findAll(request);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID createUloha(@RequestBody CreateUlohaRequest request, @RequestHeader("Authorization") @CheckRole({Role.ROLA_SPRAVCA_ULOH}) String  token) {
        return ulohaService.save(request);

    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUloha(@PathVariable UUID id, @RequestHeader("Authorization") @CheckRole({Role.ROLA_SPRAVCA_ULOH}) String  token) {

        ulohaService.delete(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void upravUlohu(@PathVariable UUID id, @RequestBody UpravUlohuRequest request, @RequestHeader("Authorization") @CheckRole({Role.ROLA_SPRAVCA_ULOH}) String  token) {
        ulohaService.upravUlohu(id, request);

    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public GetUlohaResponse getUloha(@PathVariable UUID id) {
        return ulohaService.getUloha(id);
    }


    @PutMapping("/{ulohaId}/prirad-zamestnanca/{zamestnanecId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void priradZamestnancaNaProjekt(@PathVariable UUID ulohaId, @PathVariable UUID zamestnanecId) {
        ulohaService.priradZamestnanca(ulohaId, zamestnanecId);

    }

    @PutMapping("/{ulohaId}/odstran-zamestnanca")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void odstranZamestnancaZProjektu(@PathVariable UUID ulohaId) {
        ulohaService.odstranZamestnanca(ulohaId);
    }


}
