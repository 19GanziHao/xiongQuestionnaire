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
public class Component implements Serializable {

  private Long id;

  private String type;

  private String title;

  private Integer isHidden;

  private Integer isLocked;

  private Long questionInfoId;
}
