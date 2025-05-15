package com.dennywibowo.ccproject.service;

import com.dennywibowo.ccproject.model.User;

public interface UserService {
    User saveUser(User user);
    User getUserById(Long id);
}
