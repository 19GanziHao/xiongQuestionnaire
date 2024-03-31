package com.gzh.dto;

import com.gzh.entity.Component;
import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.Data;

import java.io.Serializable;


@Data
public class ComponentDTO implements Serializable {

  private Long id;

  private String type;

  private String title;

  private Boolean isHidden;

  private Boolean isLocked;

  private Object props;

}