package com.gzh.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class AnswerItemDTO implements Serializable {

  private Long componentId;

  private String value;

  private String identification;
}
