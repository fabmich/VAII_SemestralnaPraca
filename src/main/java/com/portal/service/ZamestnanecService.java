package com.portal.service;


import com.portal.dao.FileDao;
import com.portal.dao.UlohaDao;
import com.portal.dao.ZPUDao;
import com.portal.dao.ZamestnanecDao;
import com.portal.entity.Uloha;
import com.portal.entity.Zamestnanec;
import com.portal.mapper.ZamestnanecMapper;
import com.portal.request.FindAllZamestnanecRequest;
import com.portal.request.zamestnanec.CreateZamestnanecRequest;
import com.portal.request.zamestnanec.UpravZamestnancaRequest;
import com.portal.response.GetZamestnanecResponse;
import com.portal.response.ZamestnanecFindAllResponse;
import com.portal.validator.zamestnanec.CreateZamestnanecControl;
import com.portal.validator.zamestnanec.ExistsZamestnanec;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Validated
public class ZamestnanecService {

    private final ZamestnanecDao zamestnanecDao;
    private final ZamestnanecMapper zamestnanecMapper;
    private final EntityManager entityManager;
    private final UlohaDao ulohaDao;
    private final FileDao fileDao;
    private final ZPUDao zpuDao;

    public List<ZamestnanecFindAllResponse> findAll() {

        return zamestnanecDao.findAll().stream().map(zamestnanecMapper::toZamestnanecFindAllResponse).collect(Collectors.toList());

    }

    public UUID save(@CreateZamestnanecControl CreateZamestnanecRequest request) {

        var zamestnanec = zamestnanecDao.save(Zamestnanec.builder()
                .meno(request.getMeno())
                .priezvisko(request.getPriezvisko())
                .vek(request.getVek())
                .typZamestnanca(request.getTypZamestnanca())
                .pozicia(request.getPozicia())
                .zamestnanyOd(LocalDate.now())
                .telefonneCislo(request.getTelefonneCislo())
                .email(request.getEmail().toLowerCase())
                .zpu(new HashSet<>())
                .build()
        );

        if (request.getFotkaZamestnanca() != null) {
            zamestnanec.setFotkaZamestnanca(fileDao.getReferenceById(request.getFotkaZamestnanca()));
        }

        return zamestnanec.getId();

    }

    public void delete(@ExistsZamestnanec UUID id) {

        zamestnanecDao.deleteById(id);
    }

    public GetZamestnanecResponse getZamestnanec(@ExistsZamestnanec UUID id) {
        var zamestnanec = zamestnanecDao.findById(id).get();


        return zamestnanecMapper.toGetZamestnanecResponse(zamestnanec);
    }

    public void upravZamestnanca(@ExistsZamestnanec UUID id, UpravZamestnancaRequest request) {
        var zamestnanec = zamestnanecDao.findById(id).get();

        zamestnanec.setMeno(request.getMeno());
        zamestnanec.setPriezvisko(request.getPriezvisko());
        zamestnanec.setVek(request.getVek());
        zamestnanec.setTypZamestnanca(request.getTypZamestnanca());
        zamestnanec.setPozicia(request.getPozicia());

        zamestnanecDao.save(zamestnanec);
    }


    public Set<Uloha> getUlohy(@ExistsZamestnanec UUID id) {
        var ulohaSet = new HashSet<Uloha>();
        
        zpuDao.findByZamestnanecId(id).forEach(z ->ulohaSet.add(z.getUloha()));

        return ulohaSet;
    }
}
