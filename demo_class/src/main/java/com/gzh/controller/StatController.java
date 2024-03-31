package com.gzh.controller;

import com.gzh.dto.QuestionPageQueryDTO;
import com.gzh.dto.StatPageQueryDTO;
import com.gzh.result.PageResult;
import com.gzh.result.Result;
import com.gzh.service.StatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stat")
@Slf4j
public class StatController {

  @Autowired
  private StatService statService;

  /**
   * 通过问卷id来获取统计的分页
   * @param questionId
   * @param statPageQueryDTO
   * @return
   */
  @GetMapping("/{questionId}")
  public Result<PageResult> page(@PathVariable Long questionId, StatPageQueryDTO statPageQueryDTO) {
    log.info("问卷分页查询: {}", statPageQueryDTO);
    PageResult pageResult = statService.pageQuery(questionId, statPageQueryDTO);
    return Result.success(pageResult);
  }
}
