package com.portal.service;

import com.portal.dao.ProjektDao;
import com.portal.dao.UlohaDao;
import com.portal.dao.ZPUDao;
import com.portal.dao.ZamestnanecDao;
import com.portal.entity.ZPU;
import com.portal.entity.ZPU_;
import com.portal.mapper.UlohaMapper;
import com.portal.mapper.ZPUMapper;
import com.portal.request.uloha.UlohaFindAllRequest;
import com.portal.response.ZPUResponse;
import com.portal.response.uloha.UlohaFindAllResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ZPUService {



    private final ZPUDao zpuDao;
    private final UlohaDao ulohaDao;
    private final ZamestnanecDao zamestnanecDao;
    private final ProjektDao projektDao;
    private final UlohaMapper ulohaMapper;

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


    public Page<UlohaFindAllResponse> findAllUlohyFromZPU(UlohaFindAllRequest request) {
        var pageNumber = request.getPageNumber();
        var pageSize = request.getPageSize();

        if (pageNumber >= ulohaDao.count()) {
            pageNumber = (int) ulohaDao.count() - 1;
        }

        if (pageSize >= ulohaDao.count()) {
            pageSize = (int) ulohaDao.count() ;
        }

        Pageable pageable = PageRequest.of(pageNumber,pageSize);



        Specification<ZPU>  projektLike  = null;
        if (request.getProjektId() != null) {
            var projekt = projektDao.findById(request.getProjektId()).get();

            projektLike =
                    (root, query, criteriaBuilder) ->
                            criteriaBuilder.equal(root.get(ZPU_.PROJEKT), projekt);

        }

        return zpuDao.findAll(projektLike, pageable).map(zpu -> ulohaMapper.toUlohaFindAllResponse(zpu.getUloha()));

    }
}
