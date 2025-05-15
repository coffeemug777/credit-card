package com.dennywibowo.ccproject.service;

import com.dennywibowo.ccproject.model.Card;
import com.dennywibowo.ccproject.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {
    @Autowired
    CardRepository cardRepository;

    public Card saveCard(Card card) {
        return cardRepository.save(card);
    }

    public List<Card> saveAllCard(List<Card> cards) {
        return cardRepository.saveAll(cards);
    }

    public Card getCardById(Long id) {
        return cardRepository.getReferenceById(id);
    }
}
