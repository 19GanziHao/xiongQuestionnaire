package com.gzh.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class QuestionPageQueryDTO implements Serializable {

  private int page;

  private int pageSize;

  private String keyword;

  // 0表示未收藏 1表示收藏
  private Integer isStar;

  // 0 未删除 1 删除
  private Integer isDeleted;
}
