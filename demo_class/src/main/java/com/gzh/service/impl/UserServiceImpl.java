package com.gzh.service.impl;

import com.gzh.context.BaseContext;
import com.gzh.dto.UserLoginDTO;
import com.gzh.dto.UserRegisterDTO;
import com.gzh.entity.User;
import com.gzh.mapper.UserMapper;
import com.gzh.service.UserService;
import com.gzh.vo.UserInfoVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserMapper userMapper;

  /**
   * 登录
   * @param userLoginDTO
   * @return
   */
  @Override
  public User login(UserLoginDTO userLoginDTO) {
    String username = userLoginDTO.getUsername();
    //String password = userLoginDTO.getPassword();

    // 根据用户名查询数据库中的数据
    User user = userMapper.getByUsername(username);

    return user;
  }

  /**
   * 注册
   * @param userRegisterDTO
   */
  @Override
  public void register(UserRegisterDTO userRegisterDTO) {
    User user = new User();

    BeanUtils.copyProperties(userRegisterDTO, user);

    userMapper.insert(user);
  }

  /**
   * 获取用户信息
   * @return
   */
  @Override
  public UserInfoVO getUserInfo() {

    Long currentId = BaseContext.getCurrentId();

    User user = userMapper.getUserInfoById(currentId);

    UserInfoVO userInfoVO = new UserInfoVO();
    BeanUtils.copyProperties(user, userInfoVO);

    return userInfoVO;
  }

}
