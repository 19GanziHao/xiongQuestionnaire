package com.gzh.controller;

import com.gzh.dto.AnswerDTO;
import com.gzh.result.Result;
import com.gzh.service.AnswerService;
import com.gzh.vo.AnswerVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/answer")
@Slf4j
public class AnswerController {

  @Autowired
  private AnswerService answerService;
  /**
   * 提交过来的数据 进行保存
   * @param answerDTO
   * @return
   */
  @PostMapping
  public Result submitData(@RequestBody AnswerDTO answerDTO) {
    log.info("传入过来的数据: {}", answerDTO);
    answerService.save(answerDTO);
    return Result.success();
  }
}
