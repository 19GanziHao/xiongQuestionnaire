package com.gzh.mapper;

import com.gzh.dto.UserRegisterDTO;
import com.gzh.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

  /**
   * 通过用户名来获取用户信息
   * @param username
   * @return
   */
  @Select("select * from user where username = #{username}")
  User getByUsername(String username);

  /**
   * 注册
   * @param user
   */
  @Insert("insert into user(username, password, nickname) VALUE (#{username}, #{password}, #{nickname})")
  void insert(User user);

  /**
   * 通过id来获取用户信息
   * @param currentId
   * @return
   */
  @Select("select * from user where id = #{currentId}")
  User getUserInfoById(Long currentId);
}
