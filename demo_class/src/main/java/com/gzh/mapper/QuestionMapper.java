package com.gzh.mapper;

import com.github.pagehelper.Page;
import com.gzh.dto.QuestionPageQueryDTO;
import com.gzh.entity.Question;
import com.gzh.entity.QuestionInfo;
import com.gzh.vo.QuestionVO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface QuestionMapper {
  /**
   * 通过id获取问卷信息
   * @param id
   * @return
   */
  @Select("select * from question_info where question_id = #{id}")
  QuestionInfo getQuestionInfoById(Long id);

  /**
   * 问卷分页查询
   * @param userId
   * @param questionPageQueryDTO
   * @return
   */
  Page<QuestionVO> pageQuery(Long userId, QuestionPageQueryDTO questionPageQueryDTO);

  /**
   * 更新questionInfo
   * @param questionInfo
   */
  void updateQuestionInfo(QuestionInfo questionInfo);

  /**
   * 获取问卷信息的id
   * @param questionId
   * @return
   */
  @Select("select id from question_info where question_id = #{questionId}")
  Long getId(Long questionId);

  /**
   * 获取问卷
   * @param id
   * @return
   */
  @Select("select id from question where id = #{id}")
  Question getQuestionById(Long id);

  /**
   * 创建问卷
   * @return
   */

  void insertQuestion(Question question);

  /**
   * 创建questionInfo
   * @param questionId
   */
  @Insert("insert into question_info(question_id) value (#{questionId})")
  void insertQuestionInfo(Long questionId);

  /**
   * 更新question
   * @param question
   */

  void updateQuestion(Question question);

  /**
   * 更新问卷的状态
   * @param question
   */
  void updateQuestionStatus(Question question);

  /**
   * 获得此问卷被回答的数量
   * @param questionId
   * @return
   */
  @Select("select answer_count from question where id = #{questionId}")
  int getQuestionNumber(Long questionId);

  @Update("update question set answer_count = answer_count + 1 where id = #{questionId}")
  void addAnswerCount(Long questionId);

}
