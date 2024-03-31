package com.gzh.controller;

import com.gzh.dto.QuestionPageInfoAndComponentDTO;
import com.gzh.dto.QuestionPageQueryDTO;
import com.gzh.dto.QuestionStatusDTO;
import com.gzh.result.PageResult;
import com.gzh.result.Result;
import com.gzh.service.QuestionService;
import com.gzh.vo.QuestionInfoVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/question")
@Slf4j
public class QuestionController {

  @Autowired
  private QuestionService questionService;

  /**
   * 通过id获取问卷
   * @param id
   * @return
   */
    @GetMapping("/{id}")
    public Result<QuestionInfoVO> getQuestionById(@PathVariable Long id) {
      // 通过id获取问卷
      QuestionInfoVO questionVO = questionService.getQuestionById(id);
      return Result.success(questionVO);
    }

    /**
     * 进行分页查询
     * @return
     */
    @GetMapping
    public Result<PageResult> page(QuestionPageQueryDTO questionPageQueryDTO) {
      log.info("问卷分页查询: {}", questionPageQueryDTO);
      PageResult pageResult = questionService.pageQuery(questionPageQueryDTO);
      return Result.success(pageResult);
    }

  /**
   * 更新问卷info信息
   * @param questionPageInfoAndComponentDTO
   */
  @PutMapping("/{id}")
  public Result updateQuestionInfo(@PathVariable Long id, @RequestBody QuestionPageInfoAndComponentDTO questionPageInfoAndComponentDTO) {
    log.info("id为: {}, 修改为: {}",id, questionPageInfoAndComponentDTO);
    questionService.update(id, questionPageInfoAndComponentDTO);
    return Result.success();
  }

  /**
   * 更新question的status
   * @param id
   * @return
   */
  @PatchMapping("/{id}")
  public Result updateQuestion(@PathVariable Long id, @RequestBody QuestionStatusDTO  questionStatusDTO) {
    questionService.updateQuestion(id, questionStatusDTO);
    return Result.success();
  }
  /**
   * 创建问卷
   * @return
   */
  @PostMapping
  public Result<Long> createQuestion() {
    Long id = questionService.createQuestion();
    return Result.success(id);
  }


}