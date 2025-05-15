package com.dennywibowo.ccproject.controller;

import com.dennywibowo.ccproject.model.User;
import com.dennywibowo.ccproject.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserServiceImpl accountServiceImpl;

    @GetMapping
    public User getUserById(@RequestParam("id") Long id) {
        return accountServiceImpl.getUserById(id);
    }
}
