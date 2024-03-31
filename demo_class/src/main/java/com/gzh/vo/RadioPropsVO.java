package com.gzh.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RadioPropsVO implements Serializable {

  private int id;

  private String title;

  private int isVertical;

  private List<RadioOptionVO> options;

}
