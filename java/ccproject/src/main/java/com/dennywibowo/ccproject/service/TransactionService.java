package com.dennywibowo.ccproject.service;

import com.dennywibowo.ccproject.model.Transaction;
import com.dennywibowo.ccproject.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    public Transaction saveTransaction(Transaction transaction) { return transactionRepository.save(transaction);}

    public List<Transaction> findByCardNumber(String cardNumber) {
        return transactionRepository.findByCardNumber(cardNumber);
    }

    public void deleteAll() {
        transactionRepository.deleteAll();
    }
}
