package com.portal.service;

import com.portal.dao.ProjektDao;
import com.portal.dao.UlohaDao;
import com.portal.dao.ZPUDao;
import com.portal.dao.ZamestnanecDao;
import com.portal.entity.ZPU;
import com.portal.mapper.ZPUMapper;
import com.portal.response.ZPUResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ZPUService {



    private final ZPUDao zpuDao;
    private final UlohaDao ulohaDao;
    private final ZamestnanecDao zamestnanecDao;
    private final ProjektDao projektDao;


    private final ZPUMapper zpuMapper;



    public List<ZPUResponse> findAll() {
        return zpuDao.findAll().stream()
                .map(zpuMapper::toZPUResponse)
                .collect(Collectors.toList());    }


    public List<ZPU> findAllNormal() {
        return zpuDao.findAll();
    }

    public UUID createZPU(UUID ulohaId, UUID projektId, UUID zamestnanecId) {

        var zpu = ZPU.builder()
                .uloha(ulohaDao.getReferenceById(ulohaId))
                .projekt(projektDao.getReferenceById(projektId))
                .zamestnanec(zamestnanecDao.getReferenceById(zamestnanecId))
                .build();

        return zpuDao.save(zpu).getId();

    }
    public ZPU getById(UUID id) {

        return zpuDao.findById(id).get();
    }

    public void deleteZPU(UUID id) {
        zpuDao.deleteById(id);
    }

    public void updateZPU () {

    }



    public List<ZPUResponse> findByProjektAndZamestnanec(UUID projektId, UUID zamestnanecId) {
        return zpuDao.findByProjektIdAndZamestnanecId(projektId, zamestnanecId).stream().map(zpuMapper::toZPUResponse).collect(Collectors.toList());
    }



}
