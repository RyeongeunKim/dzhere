package com.ezo.dzhereback.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter
@Setter
public class MyInfoDto {
	private String u_phone;
	private String u_email;
	
	@Builder
	public MyInfoDto(String u_phone, String u_email) {
		this.u_phone = u_phone;
		this.u_email = u_email;
	}

}