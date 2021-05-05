---
description: 자바 Lambda Expression, 람다 표현식 
---
# Lambda expression - 자바 

```java
(int x, int y) -> x + y
```

## 람다 표현식이란 무엇인가?

수학이나 컴퓨팅 분야에서는 입력값의 조합에 대해 출력값을 갖는 함수입니다.

자바에서의 정의로는 컴팩트한 구문을 가진 익명 메서드(Anonymous Method)입니다. 익명 클래스와 같이 불필요한 코드를 작성하지않고 간결한 코드를 작성할수있습니다. (물론 자바이기때문에 실제로는 객체로 구현된다)

람다 표현식은 자바8 부터 지원하기시작하였습니다. JSR335 에서 제안되었으며, 프로젝트 람다(Project Lambda)라는 이름으로 불리기도 합니다.

## 람다 표현식은 왜 추가되었는가?

State of Lambda 문서에서는, 자신들이 자바에 람다식을 추가하게된 중심 이유는 익명 클래스(Anonymous Class)가 지나치게 공간을 많이 차지하는(Vertcal Problem) 등의 문제를 해결하기위함이라고 말하고있습니다.

## 기본 문법

- (인자 리스트) → (바디)
    - (value) → (바디)
        - (Integer value) → (바디)
        - 타입을 생략할수도있고, 명시할수도 있다.
    - (인자 리스트) → { doSomeCode.. }
        - 바디가 한줄일때는 {} 를 생략할수있다.
        - {} 안에 코드를 작성한다면, 리턴타입이 있는 경우에는 return 키워드를 명시적으로 작성해야함
        - {} 없이 작성된 경우에는 return 키워드 생략 가능

## 어떻게 람다표현식이 작동하는가?

람다 표현식은 함수형 인터페이스 맥락에서 변수나 메서드 파라미터로 전달할수있습니다.

forEach 메서드를 예로 들어서 설명하자면,

아래의 람다식은 forEach 메서드의 Argument로 전달되었다.  컴파일러는 이 람다식이 사용되는 문맥을 확인한다. 이때 람다식이 전달되는 메서드의 formal parameter 는 Consumer 인터페이스이다.  컴파일러는 Consumer 인터페이스를 구현하여 인스턴스화 한다. [https://www.whiteship.me/java-news-2020-10-09/](https://www.whiteship.me/java-news-2020-10-09/)

함수형 인터페이스는 추상 메서드가 하나이기때문에, 컴파일러가 문맥을 추론해서 람다식으로 함수형 인터페이스의 추상메서드를 구현하도록하고 인스턴스화 될수있도록 할수있는것이다.

```java
public void forEach(Consumer<? super T> consumer); // 시그니처

values.forEach((value) -> System.out.println(value));
```

```java
values.forEach(new Consumer<Integer>(){
   @Override
   public void accept(Integer value){
		 System.out.println(value);
   }
})
```

forEach 메서드에 람다식을 전달한 코드는 익명 클래스를 전달한 코드와 동일한 기능을 한다.

## 람다 활용 예제1

```java
Runnable r1 = () -> System.out.println("hello world");
Runnable r3 = () -> {System.out.println("hello world");}
```

r1과 r3는 r2와 동일한 기능을 합니다.

```java
Runnable r2 = new Runnable() {
   public void run(){ 
     System.out.println("Hello Wolrd");
   }
}
```

Runnable은 Functional Interface이기때문에 람다 표현식을 사용할수있습니다. 또한 Runnable의 run 메소드의 시그니처가 () → void인데, 이 시그니처에 맞게 람다 표현식을 작성하였기때문에 제대로 동작합니다.

```java
...
public void process(Runnable r){ 
   r.run();
}
...
process(r1);
process(r2);
process(r3);
process(() -> System.out.println("Hello World"));

```

process에 직접 람다 표현식을 전달하는 방식도 가능합니다.

## 활용 예제2: 실행 어라운드 패턴

1. 먼저 함수형 인터페이스를 정의합니다.

```java
@FunctionalInterface
public interface BufferedReaderProcessor {
   String process(BufferedReader b) throws IOException;
}
```

2.  어라운드

```java
...
public String processFile(BufferedReaderProcessor p) throws IOException {
   try(BufferedReader b = new BufferedReader(new FileReader("data.txt")){
     return p.process(b);
   }
}
```

3. 람다표현식으로 구체적인 동작을 전달하여 사용

```java
String oneLine = processFile((br) -> br.readLine());
```

## 형식 검사, 형식 추론, 세부사항

람다 표현식이 사용되는 Context 에 따라서 람다의 Type이 추론됩니다. 어떤 컨텍스트(람다가 전달될 파라미터, 람다가 할당되는 변수 등)에서 기대되는 람다표현식의 형식을 Target Type이라고 부릅니다.

람다 표현식의 형식검사는 다음과 같이 이뤄집니다.

1. processFile 메서드의 선언을 확인
2. processFile 메서드의 첫번째 파라미터로 BufferedReaderProcessor 형식을 기대합니다.
3. BufferedReaderProcessor 는 한개의 추상 메서드를 정의하는 함수형 인터페이스입니다. 또한 현재 맥락에서 대상 형식이 된다.
4. 대상형식의 메서드 시그니처(함수 디스크립터)와 람다의 시그니처가 맞는지 확인한다.

형식추론

- 람다 표현식에서 파라미터의 타입을 생략해도 컴파일러가 알아서 추론한다

람다 표현식과 함수형 인터페이스

- 람다 표현식은 람다표현식이 실행되는 시점에는 함수형 인터페이스를 구현한 클래스의 인스턴스로 변환됩니다.

## 람다 표현식에서의 지역 변수 사용

- 사실상 final처럼 사용되는 변수(Effectivly Final)거나 final로 선언된 변수만 사용할수있다
- 람다의 scope는 람다를 감싸고있는 스코프랑 같다.

## 출처

[The Java Community Process(SM) Program - JSRs: Java Specification Requests - detail JSR# 335](https://jcp.org/en/jsr/detail?id=335)

[State of the Lambda](http://cr.openjdk.java.net/~briangoetz/lambda/lambda-state-final.html)

[Project Lambda](https://openjdk.java.net/projects/lambda/)
