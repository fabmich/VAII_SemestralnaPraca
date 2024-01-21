package com.portal.service;

import com.portal.ciselniky.Pozicia;
import com.portal.dao.ProjektDao;
import com.portal.dao.UlohaCisloCounterDAO;
import com.portal.dao.UlohaDao;
import com.portal.dao.ZPUDao;
import com.portal.entity.Projekt;
import com.portal.entity.UlohaCisloCounter;
import com.portal.mapper.ProjektMapper;
import com.portal.request.projekt.ProjektSaveRequest;
import com.portal.request.projekt.ProjektUpdateRequest;
import com.portal.response.projekt.ProjektFindAllResponse;
import com.portal.validator.projekt.DeleteProjekt;
import com.portal.validator.projekt.ExistsProjekt;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Validated
public class ProjektService {

    private final ProjektDao projektDao;
    private final ProjektMapper projektMapper;
    private final ZPUDao zpuDao;
    private final UlohaDao ulohaDao;
    private final UlohaCisloCounterDAO ulohaCisloCounterDAO;



    public Set<ProjektFindAllResponse> findAll() {
       return projektDao.findAll().stream().map(projektMapper::toProjektFindAllResponse).collect(Collectors.toSet());
    }


    public UUID createProject(ProjektSaveRequest request) {

        var projekt = Projekt.builder()
                .nazov(request.getNazov())
                .datumVytvorenia(LocalDateTime.now())
                .popis(request.getPopis())
                .zakaznik(request.getZakaznik())
                .prefix(request.getPrefix())
                .zpu(new HashSet<>())
                .build();


        ulohaCisloCounterDAO.save(UlohaCisloCounter.builder().prefix(request.getPrefix()).nextValue(0L).build());

        return projektDao.save(projekt).getId();

    }


    public Projekt getById(@ExistsProjekt UUID id) {

        
        return projektDao.findById(id).get();
    }


    public void deleteProjekt(@DeleteProjekt UUID id) {
        projektDao.deleteById(id);
    }

    public void update(@ExistsProjekt UUID id, ProjektUpdateRequest request) {


        var projekt = projektDao.findById(id).get();

        projekt.setNazov(request.getNazov());
        projekt.setPopis(request.getPopis());
        projekt.setPrefix(request.getPrefix());
        projekt.setZakaznik(request.getZakaznik());

        projekt.getZpu().stream().forEach(zpu -> {

            var u = zpu.getUloha();
           u.setPrefix(request.getPrefix());
            ulohaDao.save(u);
        });


    var setCountru = ulohaCisloCounterDAO.findByPrefix(request.getPrefix());
    setCountru.stream().forEach(sc -> {
        sc.setPrefix(request.getPrefix());
    });

    ulohaCisloCounterDAO.saveAll(setCountru);

        projektDao.save(projekt);
    }
}

