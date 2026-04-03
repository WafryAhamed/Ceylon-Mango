package com.ceylonmango.dto;

import com.ceylonmango.model.User;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String phone;
    private String address;
    private String status;
    private String joinDate;
    private Integer orders;
    private Double totalSpent;

    public static UserDto fromEntity(User user) {
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole() == User.Role.ADMIN ? "admin" : "customer")
                .phone(user.getPhone())
                .address(user.getAddress())
                .status(user.getStatus())
                .joinDate(user.getCreatedAt() != null ? user.getCreatedAt().toLocalDate().toString() : null)
                .build();
    }

    public static UserDto fromEntityWithStats(User user, int orderCount, double totalSpent) {
        UserDto dto = fromEntity(user);
        dto.setOrders(orderCount);
        dto.setTotalSpent(totalSpent);
        return dto;
    }
}
