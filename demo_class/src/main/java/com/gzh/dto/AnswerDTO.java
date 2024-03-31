package com.gzh.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class AnswerDTO implements Serializable {

  private Long questionId;

  private List<AnswerItemDTO> answerList;
}
