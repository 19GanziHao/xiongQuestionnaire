package com.gzh.vo;

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
public class QuestionVO implements Serializable {

  private int id;

  private String title;

  private int isPublished;

  private int isStar;

  private int answerCount;

  private String createAt;

  private int isDeleted;

}
