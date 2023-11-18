package com.portal.dao;

import com.portal.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FileDao extends JpaRepository<File, String> {

}
