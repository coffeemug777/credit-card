package com.dennywibowo.ccproject.controller;

import com.dennywibowo.ccproject.dto.UserRequest;
import com.dennywibowo.ccproject.model.User;
import com.dennywibowo.ccproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    public User getUserById(@RequestParam("id") Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/user-name-password")
    public User getUserByUserNameAndPassword(@RequestBody UserRequest userRequest) {
        return userService.findByUserNameAndPassword(userRequest.getUserName(), userRequest.getPassword());
    }
}
