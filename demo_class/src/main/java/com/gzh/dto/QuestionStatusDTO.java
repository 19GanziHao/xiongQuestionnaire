package com.gzh.dto;

import lombok.Data;

import java.io.Serializable;


@Data
public class QuestionStatusDTO implements Serializable {

  private Boolean isPublished;

  private Boolean isDeleted;

  private Boolean isStar;

}
