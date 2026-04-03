package com.ceylonmango.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UpdateProfileRequest {
    private String name;
    private String phone;
    private String address;
}
