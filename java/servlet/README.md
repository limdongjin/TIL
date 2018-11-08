## Servlet

### What is Servlet

오라클 자바EE 공식 튜토리얼 문서의 의하면 서블릿의 정의는 아래와 같다.

> A servlet is a Java programming language class used to extend the capabilities of servers that host applications accessed by means of a request-response programming model. Although servlets can respond to any type of request, they are commonly used to extend the applications hosted by web servers. For such applications, Java Servlet technology defines HTTP-specific servlet classes.

> The javax.servlet and javax.servlet.http packages provide interfaces and classes for writing servlets. All servlets must implement the Servlet interface, which defines lifecycle methods. When implementing a generic service, you can use or extend the GenericServlet class provided with the Java Servlet API. The HttpServlet class provides methods, such as doGet and doPost, for handling HTTP-specific services.

Techopedia에서의 서블릿의 정의는 아래와 같다.

> Java Servlets are server-side Java program modules that process and answer client requests and implement the servlet interface. It helps in enhancing Web server functionality with minimal overhead, maintenance and support. A servlet acts as an intermediary between the client and the server. As servlet modules run on the server, they can receive and respond to requests made by the client. Request and response objects of the servlet offer a convenient way to handle HTTP requests and send text data back to the client. Since a servlet is integrated with the Java language, it also possesses all the Java features such as high portability, platform independence, security and Java database connectivity.

간단히 말하면 서블릿은 javax.servlet.Servlet 인터페이스의 구현체이다. 그리고 서블릿은 (톰캣과 같은)컨테이너에 의해서 생성,호출, 소멸한다.

<br> 
웹요청이 들어오면, DD로 부터 이 요청에 해당하는 서블릿을 찾은후에 스레드를 생성하게된다. ( 만일 서블릿객체가 아직 생성이 안되어있다면 생성자를 통해 생성한다.) 이 스레드에 서블릿 객체가 갖고있는 service() 메소드를 실행하고, 요청의 타입에 따라 doGet(), doPost()등의 메소드 중에 하나가 실행된다. 그리고  doGet(), doPost() 메소드는 요청을 처리하여 응답을 보내게된다.

### Example1

```java 
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.stream.IntStream;

@WebServlet("/hello")
public class FirstServlet extends HttpServlet {
    public FirstServlet() {
        super();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=utf-8");
        
        PrintWriter printWriter = resp.getWriter();
        printWriter.print("<h1>One To Ten Printer Page! </h1>");
        
        IntStream.range(1, 11)
                .mapToObj(i -> i + "<br>")
                .forEach(printWriter::print);
        
        printWriter.close();
    }

}
```
Example1은 "/hello"라는 url의 GET 요청이 들어왔을때 1 ~ 10까지의 수를 출력하여 브라우저에 html로 응답을 보내주게된다. 
그리고 코드를 보면 알수있다시피 **getWriter** 메소드를 통해 PrintWriter 클래스의 객체를 얻을수있다. 또한 PrintWriter클래스의 객체인 **printWriter** 객체의 **print** 메소드를 이용하면 응답을 위한 html 코드를 만들수있다.

### Example2

```java
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
        
@WebServlet("/params")  /* /params?id=아이디파라미터 */
public class ThirdServlet extends HttpServlet {
    public ThirdServlet() {
        super();
        System.out.println("init ThirdServlet\n");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=utf-8");
        String id = req.getParameter("id");

        PrintWriter printWriter = resp.getWriter();

        printWriter.print(id);
        printWriter.close();
    }
}
```

Example2는 "/params?id=myidparam"과 같은 GET 요청이 들어왔을때 id 파라미터의 내용을 출력하여 화면에 출력해준다. 
req 객체의 **getParameter** 메소드를 사용하면 요청파라미터 값을 반환받을수있다.

### Example3 ( Servlet Config )

```
import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(
        urlPatterns = "/config",
        initParams = {
                @WebInitParam(name = "conf1", value = "Hi!!"),
                @WebInitParam(name = "hello", value = "world")
        }
)
public class FourServlet extends HttpServlet {
    public FourServlet() {
        super();
        System.out.println("init FourServlet\n");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=utf-8");
        String conf1ConfigVariable = getInitParameter("conf1");
        String helloConfigVariable = getInitParameter("hello");

        PrintWriter printWriter = resp.getWriter();

        printWriter.print(conf1ConfigVariable + "<br>");
        printWriter.print(helloConfigVariable + "<br>");
        printWriter.close();
    }
}

```

Example3에서 Servlet의 초기값을 설정하는 방법을 볼수있으며 ServletConfig라고 한다. 또한 getInitParameter 메소드를 통해 초기설정한 값을 불러올수있는것을 볼수있다.

### Example4 ( Servlet Context )

```
// web.xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app>
    <context-param>
        <param-name>cont1</param-name>
        <param-value>helloworld</param-value>
    </context-param>
    <context-param>
        <param-name>cont2</param-name>
        <param-value>gogogo!!</param-value>
    </context-param>
</web-app>
```

```java
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/context")
public class FiveServlet extends HttpServlet {
    public FiveServlet() {
        super();
        System.out.println("init FiveServlet\n");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=utf-8");

        String cont1Val = getServletContext().getInitParameter("cont1");
        String cont2Val = getServletContext().getInitParameter("cont2");

        PrintWriter printWriter = resp.getWriter();

        printWriter.print(cont1Val + "<br>");
        printWriter.print(cont2Val + "<br>");
        printWriter.close();
    }
}
```

Example4는 Servlet Context의 간단한 예시이다. Servlet 간에 정보를 공유해야 할때 주로 사용한다. 예제에서는 web.xml에서 **context-param**에 값을 설정할수있다는것을 보여준다. 
또한 **getServletContext().getInitParameter**를 통해 접근할수있음을 볼수있다.

### References

[Oracle Docs Java EE Tutorial](https://docs.oracle.com/javaee/7/tutorial/servlets001.htm#BNAFE)

[techopedia Java Servlet](https://www.techopedia.com/definition/12874/java-servlet)

[Java™ Servlet Specification ver 3.1](https://javaee.github.io/servlet-spec/downloads/servlet-3.1/Final/servlet-3_1-final.pdf)
