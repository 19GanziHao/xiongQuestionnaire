package com.gzh;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class DemoClassApplication {

  public static void main(String[] args) {
    SpringApplication.run(DemoClassApplication.class, args);
    log.info("server start");
  }

}
