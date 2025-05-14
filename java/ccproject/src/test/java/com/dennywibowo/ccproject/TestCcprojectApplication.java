package com.dennywibowo.ccproject;

import org.springframework.boot.SpringApplication;

public class TestCcprojectApplication {

	public static void main(String[] args) {
		SpringApplication.from(CcprojectApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
