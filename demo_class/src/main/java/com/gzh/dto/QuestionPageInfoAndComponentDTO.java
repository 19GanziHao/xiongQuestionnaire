package com.gzh.dto;

import com.gzh.entity.Component;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class QuestionPageInfoAndComponentDTO implements Serializable {

  private String title;

  private String desc;

  private String js;

  private String css;

  private Boolean isPublished;

  private Boolean isStar;

  private Boolean isDeleted;

  private List<ComponentDTO> componentList;

}
