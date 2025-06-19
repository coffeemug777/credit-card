package com.dennywibowo.ccproject;

import com.dennywibowo.ccproject.model.Card;
import com.dennywibowo.ccproject.model.User;
import com.dennywibowo.ccproject.repository.CardRepository;
import com.dennywibowo.ccproject.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(scanBasePackages = "com.dennywibowo")
public class CcprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(CcprojectApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(CardRepository cardRepository, UserRepository userRepository) {
		return (args) -> {
//			cardRepository.deleteAll();
//			cardRepository.save(new Card(null,"Visa","assets/visa.jpg"));
//			cardRepository.save(new Card(null,"American Express","assets/amex.jpg"));

//			userRepository.deleteAll();
//			userRepository.save(new User(null, "John Doe", "john.doe@example.com", "123 Main st, Anytonw, USA", "123456890", 50000, 4166.67f, 0L, "Johndoe", "password123"));
		};
	}

}
