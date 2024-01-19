package com.portal.dao;

import com.portal.entity.UlohaCisloCounter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UlohaCisloCounterDAO extends JpaRepository<UlohaCisloCounter, Long> {

    UlohaCisloCounter findTopByOrderByIdDesc();
}
