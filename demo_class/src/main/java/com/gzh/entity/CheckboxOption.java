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
public class CheckboxOption implements Serializable {

  private Long id;

  private String label;

  private String value;

  private int checked;

  private Long propsId;

  private Long questionInfoId;
}
