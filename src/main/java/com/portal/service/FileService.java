package com.portal.service;

import com.portal.dao.FileDao;
import com.portal.entity.File;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.UUID;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Validated
public class FileService {

    private final FileDao fileDao;

    public UUID save(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        var fileToSave = File.builder()
                .name(fileName)
                .type(file.getContentType())
                .data(file.getBytes())
                .build();

        File savedFile = fileDao.save(fileToSave);
        return savedFile.getId();
    }

//todo valdiacie
    public File getFile(UUID id) {
        return fileDao.findById(id).get();
    }

    public Stream<File> getAllFiles() {
        return fileDao.findAll().stream();
    }

    public String getBase64File(UUID id) {
        File file = fileDao.findById(id).orElse(null);

        if (file != null) {
            byte[] fileContent = file.getData();
            return Base64.getEncoder().encodeToString(fileContent);
        } else {
            return null;
        }
    }
}
