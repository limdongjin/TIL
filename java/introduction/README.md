
# 자바 실행 과정 파악하기 1

## 자바가 무엇인가요? 그리고 어떻게 실행되나요? 

자바는 JVM(Java Virtual Machine)위에서 돌아가는 프로그래밍언어이다. 
이러한 특징이 자바가 플랫폼 독립적으로 실행되도록 만들어준다. 그렇다면 자바의 실행과정을 간략히 보도록하자.

자바 소스파일이 실행되는 과정은 크게 **세단계**로 나뉜다. 

1. 개발자는 .java라는 확장자의 자바 소스파일을 작성한다.

2. .java파일을 javac 컴파일러로 컴파일하여 .class 파일로 변환한다. 

3. 이 .class 파일은 JVM을 통해 실행시킬수있는 자바 바이트코드 형식이고, 이를 JVM을 통하여 실행할수있다.

C/C++과 같은 컴파일 언어같은 경우에는 컴파일된 .exe파일을 다른 운영체제에서 실행하지 못하지만, 
자바는 컴파일된 .class 파일을 모든 운영체제에서 실행가능하다. 

왜냐하면 C/C++과 같은 컴파일 언어는 실행파일을 CPU가 곧바로 이해할수있는 네이티브코드로 바로 번역하기에 
플랫폼 종속성이 생길수밖에 없다. 반면, Java는 실행파일을 바로 네이티브코드로 번역하여 이를 실행하는 방식이 아니라, 
JVM에서 실행할수있는 Bytecode형식의 실행파일을 만드는것이기때문이다. 

즉 JAVA와 OS의 중간 다리 역활을 하는 JVM이 있기에 플랫폼 종속성이 제거된다.


이 바이트코드가 JVM에서 구체적으로 어떻게 실행되는지, JVM은 어떤 구조로 이루어졌는지도 굉장히 흥미로운데
이에 대해서는 추후에 문서를 작성하겠다.


## References

[점프 투 자바](https://wikidocs.net/887)

[책 teach yourself java in 21 days](https://www.amazon.com/Java-Days-Teach-Yourself-Covering/dp/067233710X)

[oracle java tutorial 공식 문서](https://docs.oracle.com/javase/tutorial/getStarted/intro/definition.html)

[자바가상머신, JVM이란 무엇인가? posted by Jbee](http://asfirstalways.tistory.com/158)
