package com.gzh.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class StatPageQueryDTO implements Serializable {

  private int page;

  private int pageSize;
}
