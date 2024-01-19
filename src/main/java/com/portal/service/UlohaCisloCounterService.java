package com.portal.service;

import com.portal.dao.UlohaCisloCounterDAO;
import com.portal.entity.UlohaCisloCounter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UlohaCisloCounterService {


    private final UlohaCisloCounterDAO ulohaCisloCounterDAO;

    public long getAndIncrement() {
        var currentTopId = ulohaCisloCounterDAO.findTopByOrderByIdDesc().getId();

        ulohaCisloCounterDAO.save(UlohaCisloCounter.builder().build());

        return currentTopId +  1;
    }

}
