package com.gzh.mapper;

import com.gzh.entity.*;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PropsMapper {


  /**
   * 通过组件id获取此组件的props
   * @param ComponentId
   * @return
   */
  @Select("select * from info_component_props where component_id = #{ComponentId}")
  InfoProps getInfoProps(Long ComponentId);

  /**
   * 通过组件id获取此组件的props
   * @param ComponentId
   * @return
   */
  @Select("select * from title_component_props where component_id = #{ComponentId}")
  TitleProps getTitleProps(Long ComponentId);

  /**
   * 通过组件id获取此组件的props
   * @param ComponentId
   * @return
   */
  @Select("select * from input_and_textarea_component_props where component_id = #{ComponentId}")
  InputAndTextareaProps getIputAndTextareaProps(Long ComponentId);
  /**
   * 通过组件id获取此组件的props
   * @param ComponentId
   * @return
   */
  @Select("select * from paragraph_component_props where component_id = #{ComponentId}")
  ParagraphProps getParagraphProps(Long ComponentId);
  /**
   * 通过组件id获取此组件的props
   * @param componentId
   * @return
   */
  @Select("select * from radio_and_checkbox_component_props where component_id = #{componentId}")
  RadioAndCheckboxProps getRadioAndCheckboxProps(Long componentId);

  /**
   * 插入propsInfo
   * @param props
   * @param componentId
   */
  void insertInfo(Object props, Long componentId, Long questionInfoId);

  /**
   * 插入propsTitle
   * @param props
   * @param componentId
   */
  void insertTitle(Object props, Long componentId, Long questionInfoId);

  /**
   * 插入porpsInput 或 propsTextarea
   * @param props
   * @param componentId
   */
  void insertInputAndTextarea(Object props, Long componentId, Long questionInfoId);


  /**
   * 插入propsRadio 或 propsCheckbox
   * @param props
   * @param componentId
   */
  void insertRadioAndCheckbox(Object props, Long componentId, Long questionInfoId);

  /**
   * 插入propsParagraph
   * @param props
   * @param componentId
   */
  void insertParagraph(Object props, Long componentId, Long questionInfoId);

  /**
   * 通过questionInfoId删除props
   * @param questionInfoId
   */
  @Delete("delete from info_component_props where question_info_id = #{questionInfoId}")
  void deleteInfoProps(Long questionInfoId);
  /**
   * 通过questionInfoId删除props
   * @param questionInfoId
   */
  @Delete("delete from input_and_textarea_component_props where question_info_id = #{questionInfoId}")
  void deleteInputAndTextarea(Long questionInfoId);
  /**
   * 通过questionInfoId删除props
   * @param questionInfoId
   */
  @Delete("delete from paragraph_component_props where question_info_id = #{questionInfoId}")
  void deleteParagraph(Long questionInfoId);
  /**
   * 通过questionInfoId删除props
   * @param questionInfoId
   */
  @Delete("delete from title_component_props where question_info_id = #{questionInfoId}")
  void deleteTitle(Long questionInfoId);
  /**
   * 通过questionInfoId删除props
   * @param questionInfoId
   */
  @Delete("delete from radio_and_checkbox_component_props where question_info_id = #{questionInfoId}")
  void deleteRadioAndCheckbox(Long questionInfoId);
}
