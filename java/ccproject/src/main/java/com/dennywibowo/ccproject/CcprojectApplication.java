package com.dennywibowo.ccproject;

import com.dennywibowo.ccproject.model.Card;
import com.dennywibowo.ccproject.repository.CardRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CcprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(CcprojectApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(CardRepository cardRepository) {
		return (args) -> {
			cardRepository.deleteAll();
			cardRepository.save(new Card(null,"Visa","assets/visa.jpg"));
			cardRepository.save(new Card(null,"American Express","assets/amex.jpg"));
		};
	}

}
