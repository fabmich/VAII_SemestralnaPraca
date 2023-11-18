package com.portal.controller;


import com.portal.dao.ZamestnanecDao;
import com.portal.entity.Uloha;
import com.portal.entity.Zamestnanec;
import com.portal.request.FindAllZamestnanecRequest;
import com.portal.request.zamestnanec.CreateZamestnanecRequest;
import com.portal.request.zamestnanec.UpravZamestnancaRequest;
import com.portal.response.GetZamestnanecResponse;
import com.portal.service.ZamestnanecService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
@Transactional
@RequestMapping("/zamestnanec")
public class ZamestnanecController {

    private final ZamestnanecService zamestnanecService;
    private final ZamestnanecDao zamestnanecDao;

    @PostMapping("/find-all")
    @ResponseStatus(HttpStatus.OK)
    public List<Zamestnanec> findAll() {
        return zamestnanecService.findAll();
    }//@RequestBody FindAllZamestnanecRequest request


    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID createZamestnanec(@RequestBody CreateZamestnanecRequest request) {
        return zamestnanecService.save(request);

    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteZamestnanec(@PathVariable UUID id) {

        zamestnanecService.delete(id);
    }


    @GetMapping("/getId")
    public String randomId() {
        return UUID.randomUUID().toString();
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void upravZamestnanca(@PathVariable UUID id, @RequestBody UpravZamestnancaRequest request) {
        zamestnanecService.upravZamestnanca(id, request);

    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public GetZamestnanecResponse getZamestnanec(@PathVariable UUID id) {
        return zamestnanecService.getZamestnanec(id);
    }

    @PostMapping("/find-all-filter/{id}/{meno}")
    @ResponseStatus(HttpStatus.OK)
    public List<Zamestnanec> findAllFilter(@PathVariable UUID id, @PathVariable String meno) {
        return zamestnanecDao.findAll();
    }

    @GetMapping("/{id}/getUlohy")
    public Set<Uloha> getUlohyZamestnanca(@PathVariable UUID id) {

        return zamestnanecService.getUlohy(id);
    }
}
