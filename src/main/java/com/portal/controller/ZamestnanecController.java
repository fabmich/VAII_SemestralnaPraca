package com.portal.controller;


import com.portal.ciselniky.Role;
import com.portal.dao.ZamestnanecDao;
import com.portal.entity.Uloha;
import com.portal.entity.Zamestnanec;
import com.portal.request.zamestnanec.CreateZamestnanecRequest;
import com.portal.request.zamestnanec.UpravZamestnancaRequest;
import com.portal.response.zamestnanec.GetZamestnanecResponse;
import com.portal.response.zamestnanec.ZamestnanecFindAllResponse;
import com.portal.response.zamestnanec.ZamestnanecFindAllSimpleResponse;
import com.portal.service.ZamestnanecService;
import com.portal.validator.CheckRole;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequiredArgsConstructor
@Transactional
@RequestMapping("/zamestnanec")
@Validated
public class ZamestnanecController {

    private final ZamestnanecService zamestnanecService;
    private final ZamestnanecDao zamestnanecDao;

    @PostMapping("/find-all")
    @ResponseStatus(HttpStatus.OK)
    public List<ZamestnanecFindAllResponse> findAll() {
        return zamestnanecService.findAll();
    }//@RequestBody FindAllZamestnanecRequest request


    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID createZamestnanec(@RequestBody @Valid CreateZamestnanecRequest request,@RequestHeader("Authorization") @CheckRole({Role.ROLA_SPRAVCA_ZAMESTNANCOV}) String  token) {
        return zamestnanecService.save(request);

    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteZamestnanec(@PathVariable UUID id, @RequestHeader("Authorization") @CheckRole({Role.ROLA_SPRAVCA_ZAMESTNANCOV}) String  token) {

        zamestnanecService.delete(id);
    }


    @GetMapping("/getId")
    public String randomId(@RequestHeader("Authorization") @CheckRole({Role.ROLA_ADMIN}) String  token)  {

        return UUID.randomUUID().toString();
    }



    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void upravZamestnanca(@PathVariable UUID id, @RequestBody UpravZamestnancaRequest request, @RequestHeader("Authorization") @CheckRole({Role.ROLA_SPRAVCA_ZAMESTNANCOV}) String  token) {
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
    @ResponseStatus(HttpStatus.OK)
    public Set<Uloha> getUlohyZamestnanca(@PathVariable UUID id) {

        return zamestnanecService.getUlohy(id);
    }

    @PostMapping("/find-all-simple")
    @ResponseStatus(HttpStatus.OK)
    public List<ZamestnanecFindAllSimpleResponse> findAllSimple() {
        return zamestnanecService.findAllSimple();
    }
}
