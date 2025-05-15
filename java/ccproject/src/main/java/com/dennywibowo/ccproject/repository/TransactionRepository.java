package com.dennywibowo.ccproject.repository;

import com.dennywibowo.ccproject.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {
    List<Transaction> findByCardNumber(String cardNumber);
}
