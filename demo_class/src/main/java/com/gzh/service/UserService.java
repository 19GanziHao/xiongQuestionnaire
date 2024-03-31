package com.gzh.service;

import com.gzh.dto.UserLoginDTO;
import com.gzh.dto.UserRegisterDTO;
import com.gzh.entity.User;
import com.gzh.vo.UserInfoVO;

public interface UserService {
  /**
   * 登录
   * @param userLoginDTO
   * @return
   */
  User login(UserLoginDTO userLoginDTO);

  /**
   * 注册
   * @param userRegisterDTO
   */
  void register(UserRegisterDTO userRegisterDTO);

  /**
   * 获取用户信息
   * @return
   */
  UserInfoVO getUserInfo();

}
