package com.gzh.mapper;

import com.gzh.entity.CheckboxOption;
import com.gzh.entity.RadioOption;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface OptionMapper {

  /**
   * 获取radio的选项
   * @param propsId
   * @return
   */
  @Select("select * from radio_option where props_id = #{propsId}")
  List<RadioOption> getRadioOptions(Long propsId);

  /**
   * 获取checkbox的选项
   * @param propsId
   * @return
   */
  @Select("select * from checkbox_option where props_id = #{propsId}")
  List<CheckboxOption> getCheckboxOptions(Long propsId);


  /**
   * 插入propsRadio的选项
   * @param options
   * @param propsId
   */
  void insertRadio(List<RadioOption> options, Long propsId, Long questionInfoId);

  /**
   * 插入propsCheckbox的选项
   * @param list
   * @param propsId
   */
  void insertCheckbox(List<CheckboxOption> list, Long propsId, Long questionInfoId);

  /**
   * 通过questionInfoId删除props
   * @param questionInfoId
   */
  @Delete("delete from checkbox_option where question_info_id = #{questionInfoId}")
  void delCheckboxOption(Long questionInfoId);

  /**
   * 通过questionInfoId删除props
   * @param questionInfoId
   */
  @Delete("delete from radio_option where question_info_id = #{questionInfoId}")
  void delRadioOption(Long questionInfoId);
}