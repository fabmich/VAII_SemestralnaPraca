package com.portal.dao;

import com.portal.entity.Projekt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface ProjektDao extends JpaRepository<Projekt, UUID>, JpaSpecificationExecutor<Projekt> {


}
