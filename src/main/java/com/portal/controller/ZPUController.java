package com.portal.controller;


import com.portal.entity.ZPU;
import com.portal.request.uloha.UlohaFindAllRequest;
import com.portal.response.ZPUResponse;
import com.portal.response.uloha.UlohaFindAllResponse;
import com.portal.service.ZPUService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Transactional
@RequestMapping("/zpu")
public class ZPUController {


    private final ZPUService zpuService;


    @PostMapping("/find-all")
    @ResponseStatus(HttpStatus.OK)
    public List<ZPUResponse> findAll() {
        return zpuService.findAll();
    }

    @PostMapping("/find-all-ulohy")
    @ResponseStatus(HttpStatus.OK)
    public Page<UlohaFindAllResponse> findAllUlohyFromZPU(@RequestBody UlohaFindAllRequest request) {
        return zpuService.findAllUlohyFromZPU( request);
    }


    @PostMapping("/find-all-normal")
    @ResponseStatus(HttpStatus.OK)
    public List<ZPU> findAllN() {
        return zpuService.findAllNormal();
    }



    @PostMapping("/save/{projektId}/{zamestnanecId}/{ulohaId}")
    public UUID createZPU(@PathVariable UUID projektId,@PathVariable UUID zamestnanecId,@PathVariable UUID ulohaId) {
        return zpuService.createZPU(ulohaId, projektId, zamestnanecId);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ZPU getZPUById(@PathVariable UUID id) {
        return zpuService.getById(id);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteZPUbyId(@PathVariable UUID id) {
        zpuService.deleteZPU(id);
    }

    @PostMapping("/{projektId}/{zamestnanecId}")
    public List<ZPUResponse> findByProjektAndZamestnanec(@PathVariable UUID projektId,@PathVariable UUID zamestnanecId) {

        return zpuService.findByProjektAndZamestnanec(projektId, zamestnanecId);
    }





}
