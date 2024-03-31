package com.gzh.service.impl;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.gzh.context.BaseContext;
import com.gzh.dto.*;
import com.gzh.entity.*;
import com.gzh.mapper.ComponentMapper;
import com.gzh.mapper.OptionMapper;
import com.gzh.mapper.PropsMapper;
import com.gzh.mapper.QuestionMapper;
import com.gzh.result.PageResult;
import com.gzh.service.QuestionService;
import com.gzh.vo.ComponentVO;
import com.gzh.vo.QuestionInfoVO;
import com.gzh.vo.QuestionVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class QuestionServiceImpl implements QuestionService {

  @Autowired
  private QuestionMapper questionMapper;

  @Autowired
  private ComponentMapper componentMapper;

  @Autowired
  private PropsMapper propsMapper;

  @Autowired
  private OptionMapper optionMapper;
  /**
   * 通过id获取问卷
   * @param id 问卷id
   * @return
   */
  @Override
  public QuestionInfoVO getQuestionById(Long id) {
    // 先获取问卷
    Question question = questionMapper.getQuestionById(id);
    // 先获取问卷信息
    QuestionInfo questionInfo = questionMapper.getQuestionInfoById(id);
    // 说明是新建的问卷
    if (questionInfo == null) return null;
    // 再获取问卷中的组件列表
    List<Component> componentList = componentMapper.getComponentByQuestionId(questionInfo.getId());

    List<ComponentVO> componentVOList = new ArrayList<>();
    // TODO 最后获取单个组件的props
    for (Component component : componentList) {
      Object target = null;
      switch (component.getType()) {
        case "questionInfo":
          target = propsMapper.getInfoProps(component.getId());
          break;
        case "questionTitle":
          target = propsMapper.getTitleProps(component.getId());
          break;
        case "questionInput":
        case "questionTextarea":
          target = propsMapper.getIputAndTextareaProps(component.getId());
          break;
        case "questionRadio":
        case "questionCheckbox":
          target = getRadioAndCheckboxProps(component.getId(), component.getType());
          break;
        case "questionParagraph":
          target = propsMapper.getParagraphProps(component.getId());
          break;
      }
      ComponentVO componentVO = new ComponentVO();
      BeanUtils.copyProperties(component, componentVO);
      componentVO.setProps(target);
      componentVOList.add(componentVO);
    }
    QuestionInfoVO questionInfoVO = new QuestionInfoVO();
    BeanUtils.copyProperties(questionInfo, questionInfoVO);
    questionInfoVO.setComponentList(componentVOList);

    return questionInfoVO;
  }


  /**
   * 对RadioAndCheckboxProps单独做处理
   * @param componentId
   * @param componentType
   * @return
   */
  private RadioAndCheckboxDTO getRadioAndCheckboxProps(Long componentId, String componentType) {
    // 先找props
    RadioAndCheckboxProps radioAndCheckboxProps = propsMapper.getRadioAndCheckboxProps(componentId);

    Long propsId = radioAndCheckboxProps.getId();
    // 通过propsId来找到他的选项
    List<RadioOption> options = new ArrayList<>();
    List<CheckboxOption> list = new ArrayList<>();
    switch(componentType) {
      case "questionRadio":
        options = optionMapper.getRadioOptions(propsId);
        break;
      case "questionCheckbox":
        list = optionMapper.getCheckboxOptions(propsId);
        break;
    }
    RadioAndCheckboxDTO radioAndCheckboxDTO = new RadioAndCheckboxDTO();
    BeanUtils.copyProperties(radioAndCheckboxProps, radioAndCheckboxDTO);

    if (options.size() != 0) {
      radioAndCheckboxDTO.setOptions(options);
    }
    if (list.size() != 0) {
      radioAndCheckboxDTO.setList(list);
    }

    return radioAndCheckboxDTO;
  }

  /**
   * 问卷分页查询
   * @param questionPageQueryDTO
   * @return
   */
  public PageResult pageQuery(QuestionPageQueryDTO questionPageQueryDTO) {
    PageHelper.startPage(questionPageQueryDTO.getPage(), questionPageQueryDTO.getPageSize());

    Long userId = BaseContext.getCurrentId();

    Page<QuestionVO> page = questionMapper.pageQuery(userId, questionPageQueryDTO);
    return new PageResult(page.getTotal(),page.getResult());

  }

  /**
   * 更新问卷
   * @param questionId
   * @param questionPageInfoAndComponentDTO
   */
  public void update(Long questionId, QuestionPageInfoAndComponentDTO questionPageInfoAndComponentDTO) {
    // 也要更新自己
    Question question = Question.builder()
            .id(questionId)
            .title(questionPageInfoAndComponentDTO.getTitle())
            .isPublished(questionPageInfoAndComponentDTO.getIsPublished())
            .isDeleted(questionPageInfoAndComponentDTO.getIsDeleted())
            .isStar(questionPageInfoAndComponentDTO.getIsStar())
            .build();
    // 更新问卷
    questionMapper.updateQuestion(question);

    QuestionInfo questionInfo = new QuestionInfo();
    BeanUtils.copyProperties(questionPageInfoAndComponentDTO, questionInfo);
    questionInfo.setQuestionId(questionId); // 添加问卷id
    // 更新questionInfo
    questionMapper.updateQuestionInfo(questionInfo);

    // 因为一个问卷信息只会对应一个问卷 因此根据问卷的id可以找到问卷信息的id
    Long questionInfoId = questionMapper.getId(questionId);
    questionInfo.setId(questionInfoId);

    log.info("questionInfo的id: {}", questionInfoId);
    /**
     * 最简单的更新就是把原来的数据删掉 把传入的数据添加
     */
    optionMapper.delCheckboxOption(questionInfoId);
    optionMapper.delRadioOption(questionInfoId);
    propsMapper.deleteTitle(questionInfoId);
    propsMapper.deleteInfoProps(questionInfoId);
    propsMapper.deleteParagraph(questionInfoId);
    propsMapper.deleteInputAndTextarea(questionInfoId);
    propsMapper.deleteRadioAndCheckbox(questionInfoId);
    componentMapper.delete(questionInfoId);

    // 拿到所有问卷的组件 需要添加的问卷组件
    if (questionPageInfoAndComponentDTO.getComponentList() != null) {
      List<ComponentDTO> componentList = questionPageInfoAndComponentDTO.getComponentList();
      // 根据传入的新组件进行添加
      for (ComponentDTO component :componentList) {
        componentMapper.insert(component, questionInfoId);
        insertPropsByType(component, questionInfoId);
      }
    }

  }

  /**
   * 添加每个component的props
   * @param component
   */
  public void insertPropsByType(ComponentDTO component, Long questionInfoId) {

    switch(component.getType()) {
      case "questionInfo":
        propsMapper.insertInfo(component.getProps(), component.getId(), questionInfoId);
        break;
      case "questionTitle":
        propsMapper.insertTitle(component.getProps(), component.getId(), questionInfoId);
        break;
      case "questionInput":
      case "questionTextarea":
        propsMapper.insertInputAndTextarea(component.getProps(), component.getId(), questionInfoId);
        break;
        // 因为单选和多选包含选项 所以还需另外处理
      case "questionRadio":
      case "questionCheckbox":
        propsMapper.insertRadioAndCheckbox(component.getProps(), component.getId(), questionInfoId);
        String s = JSON.toJSONString(component.getProps());
        RadioAndCheckboxDTO radioAndCheckboxProps = JSON.parseObject(s,RadioAndCheckboxDTO.class);
        if (Objects.equals(component.getType(), "questionRadio")) {
          List<RadioOption> options = radioAndCheckboxProps.getOptions();
        // 来添加此props的选项
          optionMapper.insertRadio(options, radioAndCheckboxProps.getId(), questionInfoId);
        } else {
          List<CheckboxOption> list = radioAndCheckboxProps.getList();
          optionMapper.insertCheckbox(list, radioAndCheckboxProps.getId(), questionInfoId);
        }
        break;


      case "questionParagraph":
        propsMapper.insertParagraph(component.getProps(), component.getId(), questionInfoId);
        break;
    }
  }

  /**
   * 创建问卷
   * @return
   */
  public Long createQuestion() {
    // 找到用户的id
    Long currentId = BaseContext.getCurrentId();
    Question question = new Question();
    question.setUserId(currentId);
    questionMapper.insertQuestion(question);
    // 创建对应的questionInfo
//    QuestionInfo questionInfo = new QuestionInfo();
//    questionInfo.setQuestionId(question.getId());
    questionMapper.insertQuestionInfo(question.getId());
    log.info("创建的id是: {}", question.getId());
    return question.getId();
  }

  /**
   * 更新问卷的状态
   * @param id
   * @param questionStatusDTO
   */
  public void updateQuestion(Long id, QuestionStatusDTO questionStatusDTO) {
    Question question = Question.builder()
            .id(id)
            .isPublished(questionStatusDTO.getIsPublished())
            .isStar(questionStatusDTO.getIsStar())
            .isDeleted(questionStatusDTO.getIsDeleted())
            .build();
    questionMapper.updateQuestionStatus(question);
  }
}
