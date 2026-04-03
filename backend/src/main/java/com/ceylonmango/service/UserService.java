package com.ceylonmango.service;

import com.ceylonmango.dto.UserDto;
import com.ceylonmango.model.User;
import com.ceylonmango.repository.OrderRepository;
import com.ceylonmango.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> {
                    int orderCount = orderRepository.countByUserId(user.getId());
                    double totalSpent = orderRepository.sumTotalPriceByUserId(user.getId());
                    return UserDto.fromEntityWithStats(user, orderCount, totalSpent);
                })
                .toList();
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == User.Role.ADMIN) {
            throw new RuntimeException("Cannot delete admin users");
        }

        userRepository.deleteById(id);
    }
}
