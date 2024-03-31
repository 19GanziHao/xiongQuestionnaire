package com.gzh.mapper;

import com.gzh.dto.ComponentDTO;
import com.gzh.entity.Component;
import org.apache.ibatis.annotations.Delete;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ComponentMapper {
  /**
   * 通过问卷id获取组件列表
   * @param id
   * @return
   */
  @Select("select * from component where question_info_id = #{id}")
  List<Component> getComponentByQuestionId(Long id);

  /**
   * 删除组件
   * @param questionInfoId
   */
  @Delete("delete from component where question_info_id = #{questionInfoId}")
  void delete(Long questionInfoId);

  /**
   * 插入数据
   * @param component
   * @param questionInfoId
   */
  void insert(ComponentDTO component, Long questionInfoId);
}
