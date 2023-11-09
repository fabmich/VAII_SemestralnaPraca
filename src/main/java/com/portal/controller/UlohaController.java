package com.portal.controller;


import com.portal.entity.Uloha;
import com.portal.request.uloha.CreateUlohaRequest;
import com.portal.request.uloha.UpravUlohuRequest;
import com.portal.response.GetUlohaResponse;
import com.portal.service.UlohaService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Transactional
@RequestMapping("/uloha")
public class UlohaController {

    private final UlohaService ulohaService;

    @PostMapping("/find-all")
    public List<Uloha> findAll() {
        return ulohaService.findAll();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID createZamestnanec(@RequestBody CreateUlohaRequest request) {
        return ulohaService.save(request);

    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteZamestnanec(@PathVariable UUID id) {

        ulohaService.delete(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void upravZamestnanca(@PathVariable UUID id, @RequestBody UpravUlohuRequest request) {
        ulohaService.upravZamestnanca(id, request);

    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public GetUlohaResponse getZamestnanec(@PathVariable UUID id) {
        return ulohaService.getZamestnanec(id);
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
