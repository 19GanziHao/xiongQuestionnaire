package com.gzh.mapper;

import com.github.pagehelper.Page;
import com.gzh.dto.AnswerItemDTO;
import com.gzh.entity.Component;
import com.gzh.vo.AnswerVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface AnswerMapper {


  void saveAnswer(List<AnswerItemDTO> answerList, Long questionId);

  /**
   * 获取每个组件的答案
   * @param componentId
   * @return
   */
  @Select("select answer_content from answer where component_id = #{componentId}")
  String getAnswer(Long componentId);


  Page<AnswerVO> pageQuery(List<Component> componentList);

}
