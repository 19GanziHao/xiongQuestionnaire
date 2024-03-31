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
public class TitleProps implements Serializable {

  private Long id;

  private String text;

  private int level;

  private int isCenter;

  private Long componentId;

  private Long questionInfoId;
}
