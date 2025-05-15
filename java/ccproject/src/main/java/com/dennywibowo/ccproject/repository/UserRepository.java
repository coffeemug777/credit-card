package com.dennywibowo.ccproject.repository;

import com.dennywibowo.ccproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByUserNameAndPassword(String userName, String password);
}
