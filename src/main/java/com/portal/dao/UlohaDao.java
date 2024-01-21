package com.portal.dao;

import com.portal.entity.Uloha;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UlohaDao extends JpaRepository<Uloha, UUID> {

    Page<Uloha> findByZpuZamestnanecId(UUID id, Pageable pageable);



}
