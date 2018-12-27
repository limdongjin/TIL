---
tags: ["자바", "spring","환경설정"]
---
# 인텔리제이(IntelliJ)에서 어노테이션 활용해서 Gradle + Spring MVC 시작하기! (설치)

인텔리제이에서 스프링 MVC를 초기설정하고
Hello World를 페이지에 띄우는 튜토리얼이다.

그리고 Gradle을 이용하여 의존성관리를 할것이며 Tomcat을 사용할것.

Java Based Configuration을 활용할것.

## create Intellij Gradle project

Check **java** and **web**.

![](/images/spring-gradle.png)

![](/images/spring-gradle2.png)

![](/images/spring-gradle3.png)

![](/images/spring-gradle4.png)

## build.gradle

본인이 사용하고싶은 버전에 따라서 해당 코드를 적절하게 수정하면된다.

```
plugins {
    id 'java'
    id 'war'
}

apply plugin: 'war'

group 'com.dongjin'
version '1.0-SNAPSHOT'

sourceCompatibility = 1.8

repositories {
    mavenCentral()
}

dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.11'
    testCompile group: 'junit', name: 'junit', version: '4.12'
    providedCompile 'javax.servlet:servlet-api:2.5'
    compile 'org.springframework:spring-webmvc:4.3.18.RELEASE'
    runtime 'javax.servlet:jstl:1.1.2'
}
```

## src/main/webapp/WEB-INF/web.xml

```
mkdir src/main/webapp/WEB-INF
touch src/main/webapp/WEB-INF/web.xml
```

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">

    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>
            org.springframework.web.servlet.DispatcherServlet
        </servlet-class>
        <init-param>
            <param-name>contextClass</param-name>
            <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
        </init-param>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>com.yourpackagename.yourconfigdirname</param-value>
        </init-param>
    </servlet>

    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

</web-app>
```

## src/main/java/com/yourpackagename/yourconfigdirname/WebConfig.java

```
mkdir -p src/main/java/com/yourpackagename/yourconfigdirname
touch src/main/java/com/yourpackagename/yourconfigdirname/WebConfig.java
```

```
package com.yourpackagename.yourconfigdirname;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages="com.yourpackagename.controller")
public class WebConfig {
    @Bean
    public InternalResourceViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/view/");
        resolver.setSuffix(".jsp");
        return resolver;
    }
}
```
## src/main/java/com/yourpackagename/controller/HomeController.java

```
mkdir src/main/java/com/yourpackagename/controller/
touch src/main/java/com/yourpackagename/controller/HomeController.java
```

```
package com.yourpackagename.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping(value = "/")
    public String hello(Model model){
        model.addAttribute("msg", "Hello World!");
        return "index";
    }
}
```

## Views

```
mkdir src/main/webapp/WEB-INF/view
mv src/main/webapp/index.jsp src/main/webapp/WEB-INF/view/index.jsp
```

```html
<!-- index.jsp -->
<%--
  Created by IntelliJ IDEA.
  User: imdongjin
  Date: 25/10/2018
  Time: 4:57 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Hello</title>
  </head>
  <body>
    ${msg}
  </body>
</html>
```

## Configuration for Tomcat Run

![](/images/edit-configuration.png)

![](/images/edit-configuration2.png)

![](/images/edit-configuration3.png)

![](/images/edit-configuration4.png)

## Configuration Intellij Setting

Check "Enable Annotation Processing"

![](/images/annotation-check.png)

Uncheck "Delegate IDE build/run actions to gradle"

![](/images/gradle-setting.png)

## Run! Success!

![](/images/run.png)




