package com.dennywibowo.ccproject.controller;

import com.dennywibowo.ccproject.model.Card;
import com.dennywibowo.ccproject.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/card")
public class CardController {

    @Autowired
    CardService cardService;

    @GetMapping
    public Card getCardById(@RequestParam("id") Long id) {
        return cardService.getCardById(id);
    }
}
