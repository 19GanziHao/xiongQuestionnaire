package com.gzh.dto;


import com.gzh.entity.CheckboxOption;
import com.gzh.entity.RadioOption;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class RadioAndCheckboxDTO implements Serializable {

  private Long id;

  private String title;

  private List<RadioOption> options;

  private List<CheckboxOption> list;

  private int isVertical;

  private Long componentId;

}
