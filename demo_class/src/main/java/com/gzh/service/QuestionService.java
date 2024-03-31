package com.gzh.service;

import com.gzh.dto.QuestionPageInfoAndComponentDTO;
import com.gzh.dto.QuestionPageQueryDTO;
import com.gzh.dto.QuestionStatusDTO;
import com.gzh.result.PageResult;
import com.gzh.vo.QuestionInfoVO;

public interface QuestionService {
  /**
   * 通过id获取问卷
   * @param id
   * @return
   */
  QuestionInfoVO getQuestionById(Long id);

  /**
   * 问卷分页查询
   * @param questionPageQueryDTO
   * @return
   */
  PageResult pageQuery(QuestionPageQueryDTO questionPageQueryDTO);

  /**
   * 更新问卷
   * @param questionId
   * @param questionPageInfoAndComponentDTO
   */
  void update(Long questionId, QuestionPageInfoAndComponentDTO questionPageInfoAndComponentDTO);

  /**
   * 创建一个问卷
   * @return
   */
  Long createQuestion();

  /**
   * 更新问卷的状态
   * @param questionStatusDTO
   */
  void updateQuestion(Long id,QuestionStatusDTO questionStatusDTO);

}
