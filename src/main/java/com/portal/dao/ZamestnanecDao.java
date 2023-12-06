package com.portal.dao;

import com.portal.ciselniky.Pozicia;
import com.portal.ciselniky.TypZamestnanca;
import com.portal.entity.Uloha;
import com.portal.entity.Zamestnanec;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface ZamestnanecDao extends JpaRepository<Zamestnanec, UUID>, JpaSpecificationExecutor<Zamestnanec> {

    Zamestnanec findByMenoAndPriezvisko(String meno, String priezvisko);

     Zamestnanec findByEmailOrTelefonneCisloOrDisplayName(String email, String telefonneCislo, String displayName);


}
