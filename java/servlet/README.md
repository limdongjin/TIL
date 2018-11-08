## Servlet

### What is Servlet

오라클 자바EE 공식 튜토리얼 문서의 의하면 서블릿의 정의는 아래와 같다.

> A servlet is a Java programming language class used to extend the capabilities of servers that host applications accessed by means of a request-response programming model. Although servlets can respond to any type of request, they are commonly used to extend the applications hosted by web servers. For such applications, Java Servlet technology defines HTTP-specific servlet classes.

> The javax.servlet and javax.servlet.http packages provide interfaces and classes for writing servlets. All servlets must implement the Servlet interface, which defines lifecycle methods. When implementing a generic service, you can use or extend the GenericServlet class provided with the Java Servlet API. The HttpServlet class provides methods, such as doGet and doPost, for handling HTTP-specific services.

Techopedia에서의 서블릿의 정의는 아래와 같다.

> Java Servlets are server-side Java program modules that process and answer client requests and implement the servlet interface. It helps in enhancing Web server functionality with minimal overhead, maintenance and support. A servlet acts as an intermediary between the client and the server. As servlet modules run on the server, they can receive and respond to requests made by the client. Request and response objects of the servlet offer a convenient way to handle HTTP requests and send text data back to the client. Since a servlet is integrated with the Java language, it also possesses all the Java features such as high portability, platform independence, security and Java database connectivity.

간단히 말하면 서블릿은 javax.servlet.Servlet 인터페이스의 구현체이다. 그리고 서블릿은 (톰캣과 같은)컨테이너에 의해서 생성,호출, 소멸한다.

<br> 
웹요청이 들어오면, DD로 부터 이 요청에 해당하는 서블릿을 찾은후에 스레드를 생성하게된다. 이 스레드에서 service()라는 메소드를 실행하고, 요청의 타입에 따라 doGet(), doPost()등의 메소드 중에 하나가 실행된다. 그리고  doGet(), doPost() 메소드는 요청을 처리하여 응답을 보내게된다.

### Example 

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
        //super.doGet(req, resp);
        resp.setContentType("text/html;charset=utf-8");

        PrintWriter printWriter = resp.getWriter();
        printWriter.print("<h1>One To Ten Printer Page! </h1>");
        IntStream.range(1, 11)
                .mapToObj(i -> i + "<br>")
                .forEach(printWriter::print);
    }

}
```
위의 예시 코드는 "/hello"라는 url의 GET 요청이 들어왔을때 1 ~ 10까지의 수를 출력하여 브라우저에 html로 응답을 보내주게된다. 

### References

[Oracle Docs Java EE Tutorial](https://docs.oracle.com/javaee/7/tutorial/servlets001.htm#BNAFE)

[techopedia Java Servlet](https://www.techopedia.com/definition/12874/java-servlet)
