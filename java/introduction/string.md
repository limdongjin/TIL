# 자바에서의 문자열 String

## String is immutable

자바에서 String 객체는 immutable(불변)하다.

그렇다면 immutable 하다는 것이 무엇인가?

객체가 생성된후에는 그 객체의 상태를 변경할수없다면 immutable 하다고 말한다(자바 오라클 문서)

이는 객체가 레퍼런스하는 힙 영역의 데이터를 변경할수없다는 것을 의미한다. 다른말로 인스턴스 변수가 가리키는 값을 변경하지못한다는것이다.

String의 경우에는 문자열 재할당은 가능하지만, 실제 힙 영역에 저장된 문자열 데이터에 대해서 변경을 하지 못한다.

[불변 객체란? Java Immutable Object](https://velog.io/@kyle/%EB%B6%88%EB%B3%80-%EA%B0%9D%EC%B2%B4%EB%9E%80-Java-Immutable-Object#%EC%9B%90%EC%8B%9C-%ED%83%80%EC%9E%85%EC%97%90%EC%84%9C%EC%9D%98-%EB%B6%88%EB%B3%80)

[Java에서 String 클래스가 왜 final 혹은 Immutable인가? | Mimul Tech log](https://www.mimul.com/blog/why-string-class-has-made-immutable-or-final-java/)

[Why String is immutable in Java?](https://www.programcreek.com/2013/04/why-string-is-immutable-in-java/)

[A Strategy for Defining Immutable Objects](https://docs.oracle.com/javase/tutorial/essential/concurrency/imstrat.html)

[Immutable Objects](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)

## 문자열 연결

- "+" 연산자
    - 일반적으로 성능상 추천되지않는 방법이다.
    - 문자열 + 문자열 →문자열
    - 문자열 + 숫자    → 문자열 ( 숫자가 문자열로 변환된다. 예를 들어 숫자가 35라면 "35"로 변환되어서 왼쪽 문자열에 합쳐진다)
    - 문자열 + 숫자 + 숫자 → 문자열 (결과에 주의해야한다.)
        - "Hi " + 1 + 2 → "Hi 12"

```java
String world = "World"
String helloWorld = "Hello "

helloWorld = helloWorld + world;
//-> "Hello World"

int ONE = 1;
int TWO = 2;

String hi3 = "Hi " + ONE + TWO;
//-> Hi12 
```

- StringBuilder
    - "+" 연산자를 이용하여 문자열을 합치는것보다 성능이 우수함.
    - 메서드
        - append
        - insert
        - replace
        - length
        - charAt
        - substring

```java
StringBuilder st = new StringBuilder();
st.append("Hello");
st.append(" World");

//-> st is "Hello World"
```

### 왜 + 연산보다 StringBuilder를 사용하는 것이 추천되는가?

**자바의 String 객체는 불변(immutable)이기때문이다.** 그렇기 때문에 + 연산을 하게되면  기존 문자열 객체가 가르키는 힙 영역의 값에 피연산자 문자열 값이 추가되는 직관적 방식으로 작동하지않는다.

새로운  문자열 "관련" 인스턴스가 생성되고 이 인스턴스로 피연산자 문자열 값들을 더한후에 더해진 문자열(String)을 리턴하여 기존 문자열 객체가 이를 참조하게 만든다.

- 새로운 문자열 관련 인스턴스? : 문자열 "+"연산을 할때 내부적으로 StringBuilder 가 생성된다.

```java
// StringPlusOpTest.java
// main 함수 등의 기본적인 틀은 편의상 생략하겠습니다. 
String a = "hello ";
Strinb b = "world";

a += b;
```

```jsx
// StringBuilderTest.java
String a = "hello";
String b = "world";

StringBuilder stringBuilder = new StringBuilder(a);
stringBuilder.append(b);
a = stringBuilder.toString();
```

StringPlusOpTest.java 소스 코드를 컴파일 하고 javap -c 명령으로 바이트 코드를 얻을수있으며, 이를 통해 내부적으로 돌아가는 방식을 비교 할수있다.

```
Compiled from "StringPlusOpTest.java"
class org.limdongjin.foo.StringPlusOpTest {
  org.limdongjin.foo.StringPlusOpTest();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: ldc           #2                  // String hello
       2: astore_1
       3: ldc           #3                  // String  world
       5: astore_2
       6: new           #4                  // class java/lang/StringBuilder
       9: dup
      10: invokespecial #5                  // Method java/lang/StringBuilder."<init>":()V
      13: aload_1
      14: invokevirtual #6                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      17: aload_2
      18: invokevirtual #6                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      21: invokevirtual #7                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      24: astore_1
      25: return
}
```

:6~ :21 내부적으로 새로운 StringBuilder 인스턴스가 생성되고 피연산자를 더한후에 toString으로 연산 결과가 담긴 String 객체를 리턴하는것을 볼수있다.

:24 a변수의 참조는 위의 연산결과가 담긴 객체로 변경된다.

```jsx
Compiled from "StringBuilderTest.java"
class org.limdongjin.foo.StringBuilderTest {
  org.limdongjin.foo.StringBuilderTest();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: ldc           #2                  // String hello
       2: astore_1
       3: ldc           #3                  // String world
       5: astore_2
       6: new           #4                  // class java/lang/StringBuilder
       9: dup
      10: aload_1
      11: invokespecial #5                  // Method java/lang/StringBuilder."<init>":(Ljava/lang/String;)V
      14: astore_3
      15: aload_3
      16: aload_2
      17: invokevirtual #6                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      20: pop
      21: aload_3
      22: invokevirtual #7                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      25: astore_1
      26: return
}

```

위의 두 바이트 코드만 봤을때는 StringBuilder로 구현한 프로그램도 "+"연산을 통해 구현한 프로그램과 큰 차이가 없어보인다.

하지만 문자열을 더하는 계산이 늘어나고 다소 복잡한 계산이 필요해지면 어떨까?

```jsx
// StringPlusOpTest.java
String a = "hello ";
Strinb b = "world";
String c = "java";

a += b;
a += c;
```

```jsx
// StringBuilderTest.java
String a = "hello";
String b = "world";
String c = "java";

StringBuilder stringBuilder = new StringBuilder(a);
stringBuilder.append(b);
stringBuilder.append(c);
a = stringBuilder.toString();
```

```jsx
Compiled from "StringPlusOpTest.java"
class org.limdongjin.foo.StringPlusOpTest {
  org.limdongjin.foo.StringPlusOpTest();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: ldc           #2                  // String hello
       2: astore_1
       3: ldc           #3                  // String world
       5: astore_2
       6: ldc           #4                  // String Java
       8: astore_3
       9: new           #5                  // class java/lang/StringBuilder
      12: dup
      13: invokespecial #6                  // Method java/lang/StringBuilder."<init>":()V
      16: aload_1
      17: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      20: aload_2
      21: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      24: invokevirtual #8                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      27: astore_1
      28: new           #5                  // class java/lang/StringBuilder
      31: dup
      32: invokespecial #6                  // Method java/lang/StringBuilder."<init>":()V
      35: aload_1
      36: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      39: aload_3
      40: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      43: invokevirtual #8                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      46: astore_1
      47: return
}
```

```jsx
Compiled from "StringBuilderTest.java"
class org.limdongjin.foo.StringBuilderTest {
  org.limdongjin.foo.StringBuilderTest();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: ldc           #2                  // String Hello
       2: astore_1
       3: ldc           #3                  // String world
       5: astore_2
       6: ldc           #4                  // String java
       8: astore_3
       9: new           #5                  // class java/lang/StringBuilder
      12: dup
      13: aload_1
      14: invokespecial #6                  // Method java/lang/StringBuilder."<init>":(Ljava/lang/String;)V
      17: astore        4
      19: aload         4
      21: aload_2
      22: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      25: pop
      26: aload         4
      28: aload_3
      29: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      32: pop
      33: aload         4
      35: invokevirtual #8                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      38: astore_1
      39: return
}
```

여기서 문자열 "+" 연산의  성능 저하를 확인할수있다.  [StringPlusOpTest.java](http://stringplusoptest.java) 의 바이트 코드 9번라인과 28번 라인을 보면 StringBuilder 인스턴스를 두번 생성되는것을 볼수있다. 이는 "a += b" 코드에서 StringBuilder 가 한번 생성되고, "a += c"에서 또다시 StringBuilder가 생성되는것이다.

반면 [StringBuilder.java](http://stringbuilder.java)는 명시적으로 한번 생성하였기때문에 한번만 생성되었다.

현재는 간단한 코드이기때문에 인스턴스 생성 횟수가 한번밖에 차이안나지만, 조금더 복잡한 코드였다면 "+" 연산을 사용한 프로그램에서의 불필요한 인스턴스 생성은 더욱더 많아지고, 가비지컬렉터가 StringBuilder 인스턴스의 생성과 회수를 반복하기때문에 비효율적인 성능이 나오게된다.

즉 "+" 연산보다는 StringBuilder 를 사용하는것이 성능 측면에서 효율적으로 보인다.

참고: a = a + b + c 로 변경하여 작성해보면 StringBuilder를 한번만 생성하고 a,b,c값을 append하는 바이트 코드로 변경되는것을 확인하였다.  같은 라인일때는 여러 + 연산이라도 굳이 StringBuilder를 여러개 생성하지는 않고있다.

[Java bytecode instruction listings](https://en.wikipedia.org/wiki/Java_bytecode_instruction_listings)

[Chapter 6. The Java Virtual Machine Instruction Set](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html)

[자바의 String 객체와 String 리터럴](https://madplay.github.io/post/java-string-literal-vs-string-object)

[자바 String, StringBuilder 그리고 StringBuffer 성능 차이 비교](https://madplay.github.io/post/difference-between-string-stringbuilder-and-stringbuffer-in-java)

[String Constant Pool vs String pool](https://stackoverflow.com/questions/16783971/string-constant-pool-vs-string-pool)

[Java String 의 메모리에 대한 고찰](https://medium.com/@joongwon/string-%EC%9D%98-%EB%A9%94%EB%AA%A8%EB%A6%AC%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EC%B0%B0-57af94cbb6bc)

[문자열은 불변한다(String is Immutable)](https://gbsb.tistory.com/255)

[자바 컴파일, 실행 명령어](https://www.notion.so/34f778db4aaf4f2d92aa418a4016b341)

[Chapter 6. The Java Virtual Machine Instruction Set](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html)

[불변 객체란? Java Immutable Object](https://velog.io/@kyle/%EB%B6%88%EB%B3%80-%EA%B0%9D%EC%B2%B4%EB%9E%80-Java-Immutable-Object)

[StringBuilder (Java Platform SE 7 )](https://docs.oracle.com/javase/7/docs/api/java/lang/StringBuilder.html)

[String (Java Platform SE 7 )](https://docs.oracle.com/javase/7/docs/api/java/lang/String.html)

[String, StringBuffer, StringBuilder의 차이점과 장단점은 뭔가요?](https://www.slipp.net/questions/271)

### StringBuilder vs StringBuffer

이 비교는 간단하다. 오라클 문서를 보면 답을 알수있다.

- StringBuilder → Non Thread Safe / 싱글스레드일때는 StringBuffer보다 성능 우수함
- StringBuffer → Thread Safe



즉 싱글 스레드에서는 StringBuilder 사용하는것이 좋고, 멀티 스레드에서는 StringBuffer를 사용하는것이 좋다.