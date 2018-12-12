---
prev: /java/spring/getstarted/
---
## Get Started Spring MVC with IntelliJ + Maven 

인텔리제이에서 스프링 MVC를 초기설정하고 
Hello World를 페이지에 띄우는 튜토리얼이다.

그리고 Maven을 이용하여 의존성관리를 할것이다.

### create Intellij Maven Project

New Project - Maven - Uncheck "Create from archetype"
![](/images/spring0.png)

![](/images/spring1.png)

![](/images/spring2.png)

### Add Spring MVC Framework

Click "Add Framework Support"
![](/images/spring3.png)

Check "Spring MVC"
![](/images/spring4.png)


### web/WEB-INF/web.xml

Change servlet-mapping url pattern ( from *form to / )

before web.xml
![](/images/spring5.png)

after web.xml
![](/images/spring6.png)

### Project Structure - Artifacts

![](/images/spring7.png)

![](/images/spring8.png)

Double click Spring-x.x.x RELEASE

Double click Spring MVC-x.x.x RELEASE

Click Apply

### web/WEB-INF/dispatcher-servlet.xml

setup Annotation, Component-scan

before
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

</beans>
```

after
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <mvc:annotation-driven></mvc:annotation-driven> <!-- Annotation Activate -->
    <context:component-scan base-package="Controller"></context:component-scan> <!-- Component Package -->

    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/views/"></property>
        <property name="suffix" value=".jsp"></property>
    </bean>

</beans>
```

### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.dongjin</groupId>
    <artifactId>HelloWorldSpringMaven</artifactId>
    <version>1.0-SNAPSHOT</version>
    
    <!-- Check your Spring Version -->
    <properties>
        <spring.version>4.3.18.RELEASE</spring.version>
    </properties>
    
    <!-- add Dependency ( check your spring version )-->
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>4.3.18.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>4.3.18.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>4.3.18.RELEASE</version>
        </dependency>
    </dependencies>

</project>
```

### Views

create "views" Directory, and Move index.jsp to "views" Directory

![](/images/spring9.png)

### Controller 

create "Controller" package, and create HomeController.java 

![](/images/spring10.png)

write Some code

![](/images/spring11.png)

### Run 

Click "Edit Configuration"

![](/images/spring12.png)

Add Tomcat Server (local), and Click "Fix"

![](/images/spring13.png)

Click "Apply"

![](/images/spring14.png)

### Success!
