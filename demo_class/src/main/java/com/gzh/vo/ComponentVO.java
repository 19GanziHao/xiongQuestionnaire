package com.gzh.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ComponentVO implements Serializable {

  private Long id;

  private String type;

  private String title;

  private Integer isHidden;

  private Integer isLocked;

  private Long questionId;

  private Object props;
}
