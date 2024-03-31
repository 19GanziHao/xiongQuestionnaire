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
public class QuestionInfo implements Serializable {

  private Long id;

  private String title;

  private String desc;

  private String js;

  private String css;

  private Boolean isPublished;

  private Boolean isDeleted;

  private Long questionId;
}
