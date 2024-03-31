package com.gzh.service;

import com.gzh.dto.StatPageQueryDTO;
import com.gzh.result.PageResult;

public interface StatService {
  /**
   * 通过问卷id来获取统计的分页
   * @param questionId
   * @param statPageQueryDTO
   * @return
   */
  PageResult pageQuery(Long questionId, StatPageQueryDTO statPageQueryDTO);

}
