package com.dennywibowo.ccproject.service;

import com.dennywibowo.ccproject.model.User;
import com.dennywibowo.ccproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }
    public User getUserById(Long id) {
        return userRepository.getReferenceById(id);
    }
    public User findByUserNameAndPassword(String userName, String password){return userRepository.findByUserNameAndPassword(userName, password);}
}
