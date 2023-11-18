package com.portal.service;


import com.portal.ciselniky.StavUlohy;
import com.portal.dao.UlohaDao;
import com.portal.dao.ZamestnanecDao;
import com.portal.entity.Uloha;
import com.portal.mapper.UlohaMapper;
import com.portal.request.uloha.CreateUlohaRequest;
import com.portal.request.uloha.UpravUlohuRequest;
import com.portal.response.GetUlohaResponse;
import com.portal.validator.uloha.ExistsUloha;
import com.portal.validator.zamestnanec.ExistsZamestnanec;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Validated
public class UlohaService {

    private final UlohaDao ulohaDao;
    private final ZamestnanecDao zamestnanecDao;

    private final UlohaMapper ulohaMapper;


    public List<Uloha> findAll() {
//        Pageable pageable = PageRequest.of(0,2);
        return ulohaDao.findAll();

    }
    public UUID save(CreateUlohaRequest request) {

        var uloha =  ulohaDao.save(Uloha.builder()
                .nazov(request.getNazov())
                .datumVytvorenia(OffsetDateTime.now())
                .popis(request.getPopis())
                .deadline(request.getDeadline())
                .zadavatel(zamestnanecDao.getReferenceById(request.getZadavatel()))
                .vrstva(request.getVrstva())
                .fixVersion(request.getFixVersion())
                .stavUlohy(StavUlohy.BACKLOG)

                .priradenyZamestnanec(zamestnanecDao.getReferenceById(request.getPriradenyZamestnanec()))

                .build());

        var zamestnanec = zamestnanecDao.findById(request.getPriradenyZamestnanec()).get();
        zamestnanec.getPrideleneUlohy().add(uloha);
        zamestnanecDao.save(zamestnanec);

        return uloha.getId();

    }

    public void delete(@ExistsUloha UUID id) {

        ulohaDao.deleteById(id);
    }

    public void upravZamestnanca(@ExistsUloha UUID id, UpravUlohuRequest request) {

        var uloha = ulohaDao.findById(id).get();

        uloha.setNazov(request.getNazov());
        uloha.setPopis(request.getPopis());
        uloha.setNazov(request.getNazovZakaznika());
        uloha.setDeadline(request.getDeadline());
        uloha.setZadavatel(zamestnanecDao.getReferenceById(request.getSefProjektu()));
        uloha.setPriradenyZamestnanec(zamestnanecDao.existsById(request.getPriradenyZamestnanec()) ?
                zamestnanecDao.getReferenceById(request.getPriradenyZamestnanec()) : zamestnanecDao.getReferenceById(request.getSefProjektu()));


        ulohaDao.save(uloha);
    }

    public GetUlohaResponse getZamestnanec(@ExistsUloha UUID id) {
        var uloha = ulohaDao.findById(id).get();

        return ulohaMapper.toGetUlohaResponse(uloha);
    }

    public void priradZamestnanca(@ExistsUloha UUID ulohaId,@ExistsZamestnanec UUID zamestnanecId) {
        var uloha= ulohaDao.findById(ulohaId).get();

        uloha.getPriradenyZamestnanec().setUloha(null);

        uloha.setPriradenyZamestnanec(zamestnanecDao.getReferenceById(zamestnanecId));

        var priradenyZamestnanec = zamestnanecDao.findById(zamestnanecId).get();
        priradenyZamestnanec.setUloha(ulohaDao.getReferenceById(ulohaId));

        ulohaDao.save(uloha);
        zamestnanecDao.save(priradenyZamestnanec);

    }

    public void odstranZamestnanca(@ExistsUloha UUID ulohaId) {
        var uloha= ulohaDao.findById(ulohaId).get();

        uloha.getPriradenyZamestnanec().setUloha(null);
        //priradi default -  spravcu
        uloha.setPriradenyZamestnanec(zamestnanecDao.getReferenceById(uloha.getZadavatel().getId()));

        var sef = zamestnanecDao.findById(uloha.getZadavatel().getId()).get();
        sef.setUloha(ulohaDao.getReferenceById(ulohaId));

        ulohaDao.save(uloha);
        zamestnanecDao.save(sef);
    }



}
