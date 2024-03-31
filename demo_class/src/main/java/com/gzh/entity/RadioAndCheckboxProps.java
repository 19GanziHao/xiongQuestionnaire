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
public class RadioAndCheckboxProps implements Serializable {

  private Long id;

  private String title;

  private int isVertical;

  private Long componentId;

  private Long questionInfoId;
}
