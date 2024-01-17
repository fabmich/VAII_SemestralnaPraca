package com.portal.dao;


import com.portal.entity.ZPU;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface ZPUDao extends JpaRepository<ZPU, UUID>, JpaSpecificationExecutor<ZPU> {


    List<ZPU> findByProjektIdAndZamestnanecId(UUID projekt, UUID zamestnanec);
}
