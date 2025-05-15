package com.dennywibowo.ccproject.controller;

import com.dennywibowo.ccproject.model.Transaction;
import com.dennywibowo.ccproject.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @PostMapping
    public Transaction saveTransaction(@RequestBody Transaction transaction) {
        return transactionService.saveTransaction(transaction);
    }

    @GetMapping("/get-list")
    public List<Transaction> getTransactions(@RequestParam("cardNumber") String cardNumber) {
        return transactionService.findByCardNumber(cardNumber);
    }

    @PostMapping("/delete-all")
    public void deleteAll() {
        transactionService.deleteAll();
    }
}
