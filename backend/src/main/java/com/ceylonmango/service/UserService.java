package com.ceylonmango.service;

import com.ceylonmango.dto.UserDto;
import com.ceylonmango.model.User;
import com.ceylonmango.repository.OrderRepository;
import com.ceylonmango.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> {
                    int orderCount = orderRepository.countByUserId(user.getId());
                    double totalSpent = orderRepository.sumTotalPriceByUserId(user.getId());
                    return UserDto.fromEntityWithStats(user, orderCount, totalSpent);
                })
                .toList();
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == User.Role.ADMIN) {
            throw new RuntimeException("Cannot delete admin users");
        }

        userRepository.deleteById(id);
    }
}
