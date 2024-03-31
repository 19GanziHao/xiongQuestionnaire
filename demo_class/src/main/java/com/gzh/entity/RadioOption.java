package com.gzh.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RadioOption implements Serializable {

  private Long id;

  private String label;

  private String value;

  private Long propsId;

  private Long questionInfoId;
}
