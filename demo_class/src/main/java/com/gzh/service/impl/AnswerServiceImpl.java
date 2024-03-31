package com.gzh.service.impl;

import com.gzh.dto.AnswerDTO;
import com.gzh.dto.AnswerItemDTO;
import com.gzh.entity.Question;
import com.gzh.mapper.AnswerMapper;
import com.gzh.mapper.QuestionMapper;
import com.gzh.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerServiceImpl implements AnswerService {

  @Autowired
  private AnswerMapper answerMapper;

  @Autowired
  private QuestionMapper questionMapper;
  /**
   * 保存数据
   * @param answerDTO
   */
  public void save(AnswerDTO answerDTO) {
    List<AnswerItemDTO> answerList = answerDTO.getAnswerList();

    answerMapper.saveAnswer(answerList, answerDTO.getQuestionId());
    // 更新问卷回答次数
    questionMapper.addAnswerCount(answerDTO.getQuestionId());
  }
}
