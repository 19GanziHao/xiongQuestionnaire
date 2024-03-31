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
public class InputAndTextareaProps implements Serializable {

  private Long id;

  private String title;

  private String placeholder;

  private Long componentId;

  private Long questionInfoId;
}
