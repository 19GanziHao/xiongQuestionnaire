package com.gzh.controller;

import com.gzh.constant.JwtClaimsConstant;
import com.gzh.dto.UserLoginDTO;
import com.gzh.dto.UserRegisterDTO;
import com.gzh.entity.User;
import com.gzh.properties.JwtProperties;
import com.gzh.result.Result;
import com.gzh.service.UserService;
import com.gzh.utils.JwtUtil;
import com.gzh.vo.UserInfoVO;
import com.gzh.vo.UserLoginVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtProperties jwtProperties;

  /**
   * 登录
   * @param userLoginDTO
   * @return
   */
  @PostMapping("/login")
  public Result<UserLoginVO> login(@RequestBody UserLoginDTO userLoginDTO) {
    log.info("员工登录: {}", userLoginDTO);

    User user = userService.login(userLoginDTO);

    //登录成功后，生成jwt令牌
    Map<String, Object> claims = new HashMap<>();
    claims.put(JwtClaimsConstant.USER_ID, user.getId());

    // 创建token
    String token = JwtUtil.createJWT(
            jwtProperties.getUserSecretKey(),
            jwtProperties.getUserTtl(),
            claims);
    // 创建返回的用户数据
    UserLoginVO userLoginVO =UserLoginVO.builder()
            .id(user.getId())
            .username(user.getUsername())
            .token(token)
            .build();
    return Result.success(userLoginVO);
  }

  @GetMapping("/info")
  public Result<UserInfoVO> getUserInfo() {
    UserInfoVO userInfoVO = userService.getUserInfo();
    return Result.success(userInfoVO);
  }


  @PostMapping("/register")
  public Result register(@RequestBody UserRegisterDTO userRegisterDTO) {
    log.info("注册信息: {}", userRegisterDTO);
    userService.register(userRegisterDTO);

    return Result.success();
  }

  /**
   * 退出
   *
   * @return
   */
  @PostMapping("/logout")
  public Result<String> logout() {
    return Result.success();
  }
}
