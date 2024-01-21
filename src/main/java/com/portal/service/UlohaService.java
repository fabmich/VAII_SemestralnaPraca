package com.portal.service;


import com.portal.ciselniky.StavUlohy;
import com.portal.dao.ProjektDao;
import com.portal.dao.UlohaDao;
import com.portal.dao.ZPUDao;
import com.portal.dao.ZamestnanecDao;
import com.portal.entity.QUloha;
import com.portal.entity.Uloha;
import com.portal.entity.Uloha_;
import com.portal.entity.ZPU_;
import com.portal.mapper.UlohaMapper;
import com.portal.request.uloha.CreateUlohaRequest;
import com.portal.request.uloha.UlohaFindAllRequest;
import com.portal.request.uloha.UpravUlohuRequest;
import com.portal.response.uloha.GetUlohaResponse;
import com.portal.response.uloha.UlohaFindAllResponse;
import com.portal.validator.uloha.ExistsUloha;
import com.portal.validator.zamestnanec.ExistsZamestnanec;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Validated
public class UlohaService {

    private final UlohaDao ulohaDao;
    private final ZamestnanecDao zamestnanecDao;
    private final ZPUDao zpuDao;
    private final ZPUService zpuService;
    private final ProjektDao projektDao;


    private final UlohaMapper ulohaMapper;
    private final UlohaCisloCounterService ulohaCisloCounterService;

    public Page<UlohaFindAllResponse> findAll(UlohaFindAllRequest request) {
        var pageNumber = request.getPageNumber();
        var pageSize = request.getPageSize();

        if (pageNumber >= ulohaDao.count()) {
            pageNumber = (int) ulohaDao.count() - 1;
        }

        if (pageSize >= ulohaDao.count()) {
            pageSize = (int) ulohaDao.count() ;
        }

        Pageable pageable = PageRequest.of(pageNumber,pageSize);

//        Specification<Uloha> nameLike =
//                (root, query, criteriaBuilder) ->
//                        criteriaBuilder.like(root.get(ZPU_).equals()
//
//
////        ulohaDao.findAll(, pageable);
        return ulohaDao.findAll(pageable).map(ulohaMapper::toUlohaFindAllResponse);

    }
    public UUID save(CreateUlohaRequest request) {

        var projektPrefix = projektDao.findById(request.getProjekt()).get().getPrefix();

        var uloha =  ulohaDao.save(Uloha.builder()
                .nazov(request.getNazov())
                .datumVytvorenia(LocalDateTime.now())
                .popis(request.getPopis())
                .deadline(request.getDeadline())
                .zadavatel(zamestnanecDao.getReferenceById(request.getZadavatel()))
                .vrstva(request.getVrstva())
                .fixVersion(request.getFixVersion())
                        .cisloUlohy(ulohaCisloCounterService.getAndIncrement(projektPrefix))
                        .prefix(projektPrefix)
                .stavUlohy(StavUlohy.BACKLOG)
//                                .zpu(new HashSet<>())

//                .priradenyZamestnanec(zamestnanecDao.getReferenceById(request.getPriradenyZamestnanec()))
                .build());

            var zpuId = zpuService.createZPU(uloha.getId(), request.getProjekt(), request.getPriradenyZamestnanec());
            uloha.setZpu(zpuDao.getReferenceById(zpuId));
//        var zamestnanec = zamestnanecDao.findById(request.getPriradenyZamestnanec()).get();
//        zamestnanec.getPrideleneUlohy().add(uloha);
//        zamestnanecDao.save(zamestnanec);

        return uloha.getId();

    }

    public void delete(@ExistsUloha UUID id) {

        ulohaDao.deleteById(id);
    }

    public void upravUlohu(@ExistsUloha UUID id, UpravUlohuRequest request) {

        var uloha = ulohaDao.findById(id).get();

        uloha.setNazov(request.getNazov());
        uloha.setPopis(request.getPopis());
        uloha.getZpu().setZamestnanec(zamestnanecDao.getReferenceById(request.getPriradenyZamestnanec()));
        uloha.setDeadline(request.getDeadline());
        uloha.setVrstva(request.getVrstva());
        uloha.setFixVersion(request.getFixVersion());
        uloha.setZadavatel(zamestnanecDao.getReferenceById(request.getZadavatel()));
        uloha.setStavUlohy(request.getStavUlohy());
//        uloha.setPriradenyZamestnanec(zamestnanecDao.existsById(request.getPriradenyZamestnanec()) ?
//                zamestnanecDao.getReferenceById(request.getPriradenyZamestnanec()) : zamestnanecDao.getReferenceById(request.getSefProjektu()));
//

        ulohaDao.save(uloha);
    }

    public GetUlohaResponse getUloha(@ExistsUloha UUID id) {
        var uloha = ulohaDao.findById(id).get();



        var response =  ulohaMapper.toGetUlohaResponse(uloha);
        var zpu = zpuDao.findByUlohaId(uloha.getId());

        if (zpu != null) {

            response.setMenoPriezviskoPriradenehoZamestnanca(zpu.getZamestnanec().getMeno() + " " + zpu.getZamestnanec().getPriezvisko());
            response.setPriradenyZamestnanecId(zpu.getZamestnanec().getId());

            response.setMenoPriezviskoZadavatela(uloha.getZadavatel().getMeno() + " " + uloha.getZadavatel().getPriezvisko());
        }
        else {
            response.setMenoPriezviskoPriradenehoZamestnanca("Task nemá priradeného zamestnanca");
        }
        return response;
    }

    public void priradZamestnanca(@ExistsUloha UUID ulohaId,@ExistsZamestnanec UUID zamestnanecId) {
//        var uloha= ulohaDao.findById(ulohaId).get();
//
//        uloha.getPriradenyZamestnanec().setUloha(null);
//
//        uloha.setPriradenyZamestnanec(zamestnanecDao.getReferenceById(zamestnanecId));
//
//        var priradenyZamestnanec = zamestnanecDao.findById(zamestnanecId).get();
//        priradenyZamestnanec.setUloha(ulohaDao.getReferenceById(ulohaId));
//
//        ulohaDao.save(uloha);
//        zamestnanecDao.save(priradenyZamestnanec);

    }

    public void odstranZamestnanca(@ExistsUloha UUID ulohaId) {
//        var uloha= ulohaDao.findById(ulohaId).get();
//
//        uloha.getPriradenyZamestnanec().setUloha(null);
//        //priradi default -  spravcu
//        uloha.setPriradenyZamestnanec(zamestnanecDao.getReferenceById(uloha.getZadavatel().getId()));
//
//        var sef = zamestnanecDao.findById(uloha.getZadavatel().getId()).get();
//        sef.setUloha(ulohaDao.getReferenceById(ulohaId));
//
//        ulohaDao.save(uloha);
//        zamestnanecDao.save(sef);
    }



}
