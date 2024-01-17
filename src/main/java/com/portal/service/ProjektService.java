package com.portal.service;

import com.portal.dao.ProjektDao;
import com.portal.entity.Projekt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjektService {

    private final ProjektDao projektDao;




    public List<Projekt> findAll() {
       return projektDao.findAll();
    }


    public UUID createProject(String nazov) {

        var projekt = Projekt.builder().nazov(nazov).datumVytvorenia(LocalDateTime.now())
                .zpu(new HashSet<>())
                .build();

        return projektDao.save(projekt).getId();

    }


    public Projekt getById(UUID id) {
        return projektDao.findById(id).get();
    }


    public void deleteProjekt(UUID id) {
        projektDao.deleteById(id);
    }

}
