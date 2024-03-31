package com.gzh.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionInfoVO implements Serializable {

  private Long id;

  private String title;

  private String desc;

  private String js;

  private String css;

  private Boolean isPublished;

  private Boolean isDeleted;

  private List<ComponentVO> componentList;
}
