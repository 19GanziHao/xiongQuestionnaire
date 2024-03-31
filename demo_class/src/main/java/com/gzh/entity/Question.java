package com.gzh.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question implements Serializable {

  private Long id;

  private String title;

  /**
   * 0 是未发布
   * 1 是已发布
   */
  private Boolean isPublished;

  private Boolean isStar;

  private Integer answerCount;

  private LocalDateTime createAt;

  /**
   * 0 未删除
   * 1 删除
   */
  private Boolean isDeleted;

  private Long userId;
}
