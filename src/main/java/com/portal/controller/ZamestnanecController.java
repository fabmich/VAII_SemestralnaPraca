package com.portal.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jwt.JWTParser;
import com.portal.ciselniky.Role;
import com.portal.dao.ZamestnanecDao;
import com.portal.entity.Uloha;
import com.portal.entity.Zamestnanec;
import com.portal.request.FindAllZamestnanecRequest;
import com.portal.request.zamestnanec.CreateZamestnanecRequest;
import com.portal.request.zamestnanec.UpravZamestnancaRequest;
import com.portal.response.GetZamestnanecResponse;
import com.portal.response.ZamestnanecFindAllResponse;
import com.portal.service.ZamestnanecService;
import com.portal.utils.JWTParserUtil;
import com.portal.validator.CheckRole;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.IOException;
import java.text.ParseException;
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
}
