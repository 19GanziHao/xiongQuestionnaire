package com.gzh.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.gzh.context.BaseContext;
import com.gzh.dto.StatPageQueryDTO;
import com.gzh.entity.Component;
import com.gzh.mapper.AnswerMapper;
import com.gzh.mapper.ComponentMapper;
import com.gzh.mapper.QuestionMapper;
import com.gzh.result.PageResult;
import com.gzh.service.StatService;
import com.gzh.vo.AnswerVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class StatServiceImpl implements StatService {

  @Autowired
  private QuestionMapper questionMapper;

  @Autowired
  private ComponentMapper componentMapper;

  @Autowired
  private AnswerMapper answerMapper;
  /**
   * 通过问卷id来获取统计的分页
   * 此地的数据显示的是这个问卷中已经被回答过的答案展示
   * @param questionId
   * @param statPageQueryDTO
   * @return
   */
  public PageResult pageQuery(Long questionId, StatPageQueryDTO statPageQueryDTO) {
    PageHelper.startPage(statPageQueryDTO.getPage(), statPageQueryDTO.getPageSize());

//    Long userId = BaseContext.getCurrentId();
    // 获得此问卷被回答的数量
    int answerCount = questionMapper.getQuestionNumber(questionId);
    log.info("此问卷答卷数量为: {}", answerCount);

    // 获得这个问卷的所有组件
    List<Component> componentList =  componentMapper.getComponentByQuestionId(questionId);

    List<AnswerVO> list = new ArrayList<>();
    // TODO: 统计问卷后面再来做
    // 通过问卷id找到每个组件 将每个组件所需内容提取出来
    Page<AnswerVO> page = answerMapper.pageQuery(componentList);

    log.info("page页面的内容是: {}", page.getResult());
    page.setTotal(answerCount);
    return new PageResult(page.getTotal(), page.getResult());
  }
}
