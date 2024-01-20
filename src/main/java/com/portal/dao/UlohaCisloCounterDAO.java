package com.portal.dao;

import com.portal.entity.UlohaCisloCounter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UlohaCisloCounterDAO extends JpaRepository<UlohaCisloCounter, Long> {

    UlohaCisloCounter findTopByPrefixOrderByNextValueDesc(String prefix);

    Set<UlohaCisloCounter> findByPrefix(String prefix);
}
