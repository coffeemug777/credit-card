package com.dennywibowo.ccproject.controller;

import com.dennywibowo.ccproject.model.Transaction;
import com.dennywibowo.ccproject.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.Date;
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

    @GetMapping("/get-recent")
    public List<Transaction> getRecentTransactions(@RequestParam("cardNumber") String cardNumber) {
        //get latest 3 dates
        List<Transaction> rawResult = transactionService.findByCardNumber(cardNumber);
        Date latestDate = rawResult.stream().sorted(Comparator.comparing(Transaction::getDate, Comparator.reverseOrder())).toList().get(0).getDate();
        LocalDate localLatestDate = latestDate.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        LocalDate localStartDate = localLatestDate.minusDays(2);
        ZoneId defaultZoneId = ZoneId.systemDefault();
        Instant localStartDateInstant = localStartDate.atStartOfDay(defaultZoneId).toInstant();
        Date startDate = Date.from(localStartDateInstant);

        return rawResult.stream().filter(transaction -> transaction.getDate().after(startDate) && transaction.getDate().before(latestDate)).toList();
    }

    @PostMapping("/delete-all")
    public void deleteAll() {
        transactionService.deleteAll();
    }
}
