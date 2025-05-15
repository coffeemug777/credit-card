package com.dennywibowo.ccproject.repository;

import com.dennywibowo.ccproject.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
