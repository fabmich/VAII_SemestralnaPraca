package com.portal.service;

import com.portal.dao.UlohaCisloCounterDAO;
import com.portal.entity.UlohaCisloCounter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UlohaCisloCounterService {


    private final UlohaCisloCounterDAO ulohaCisloCounterDAO;

    public long getAndIncrement(String prefix) {
        var currentTop = ulohaCisloCounterDAO.findTopByPrefixOrderByNextValueDesc(prefix).getNextValue();

        ulohaCisloCounterDAO.save(UlohaCisloCounter.builder().prefix(prefix).nextValue(currentTop + 1).build());

        return currentTop +  1;
    }

}
