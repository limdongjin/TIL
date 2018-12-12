---
prev: /java/
---
## Class

### 자바에서의 클래스를 살펴보자.
* 클래스 작성

* 객체 생성 및 사용

* 객체 생성과정 이해하기

* 상속하기 

* 추상 클래스

* 
#### 클래스 작성

```java
public class Car {
    // 인스턴스 변수 정의 및 접근 제어자 설명
    public String color; // public: 어떤 클래스내에서라도 접근이 가능함
    private String name; // private: 해당 클래스내에서만 접근이 가능함
    protected int price; // protected: 동일 패키지에 속하는 클래스와 하위 클래스에서 접근 가능함
    boolean isfire;      // default: 동일 클래스, 동일 패키지내에서 접근 가능함.
    
    // static 변수 정의
    static String country = "korea";
    // static 특징
    // 인스턴스들간에 공통적으로 사용해야하는 값의 경우 유용
    // 클래스가 메모리에 올라갈때 자동적으로 생성되므로 인스턴스를 생성하지않더라도 사용가능함.
    // 메소드내에서 인스턴스 변수를 사용하지않는다면 static으로 메소드를 선언하는 것이 메소드 호출시간이 짧아진다.
    
    // 생성자 정의
    public Car(String c, int p){ 
        // 리턴타입을 정의하지 않는다.
        // 클래스명과 생성자 메소드명은 동일하다.
        color = c;
        price = p;
    }
    
    // setter
    public static void setName(String n){
        name = n;
    }
    
    // getter
    public static String getName(){
        return name;
    }
    
    // static 메소드
    public static void Hello(){
        System.out.println("Hello World");
       //  System.out.println(isfire); // error code. static 메소드는 인스턴스 변수에 접근할수없다.
    }
}
```

#### 객체 생성 및 사용

```java 
Car mycar = new Car("Blue", 2000);
// Car : 클래스로 생성한 사용자 데이터 타입
// mycar : Car 데이터타입으로 선언한 변수
// new : 메모리를 생성하는 연산자
// Car() : 메모리 생성후 초기화 작업을 담당하는 생성자 

System.out.println(mycar.price);
// 2000

System.out.println(mycar.color);
// Blue

// mycar.name = "BMW"; // error code. because name is private  

mycar.setName("BMW");

System.out.println(mycar.getName()); 
// BMW 

mycar.isfire = true;

if ( mycar.isfire ){
    System.out.println("BMW is Fire!!");
}
// BMW is Fire!!
```

#### 객체 생성 과정 이해하기

```
Car mycar;
mycar = new Car();
```

자바의 **new 연산자**는 메모리를 생성한다음 메모리 주소의 참조값을 객체변수 mycar에 할당한다. 생성자 메소드는 생성된 메모리의 초기화 작업 진행한다. 
즉 모든 객체변수는 참조값을 갖게된다. 주의할점은 포인터가 아니라 참조값(Reference)이라는것이다.

```
Car mycar = new Car();
Car mycar2 = mycar;
```

그렇기때문에 위의 mycar2 객체변수는 mycar의 참조값을 넘겨받는것이고, mycar의 내용을 복사받는게 아니라 참조값만을 넘겨받는것이다.

#### 상속하기 

```java 
public class Bmw extends Car {
  //...
} 

// class 자식클래스 extends 부모클래스
```

#### 추상 클래스 ( Abstract Class )

추상 클래스는 구현이 덜되었거나, 아직은 미완성인 클래스이기때문에 추상클래스라고 부른다. 미완성 메소드, 즉 추상메소드를 단 하나라도 포함하고있는 클래스를 추상클래스라고 한다.

```
// 추상클래스의 작성 
abstract class 클래스이름 {
    abstract 메소드선언; // ex) public abstract void hello();
    abstract 메소드 선언;
}
```

> 추상 클래스는 미완성 클래스이기때문에 객체를 생성하지못한다. 추상 클래스는 객체가 가지는 특성들을 추상화시켜놓았을뿐, 아직 구체화되지못한 클래스이므로, 이 추상클래스를 상속하는 하위클래스에서 구체화시키도록하는 방법을 사용한다. 주의할점은 자식클래스가 상속을 받고 추상메소드를 하나라도 남겨놓았다면 자식클래스도 추상클래스가 된다 

#### Object Identity vs Object Equality

Object Identity는 참조값(reference)가 같은 경우를 말하며,
Object Equality는 참조값은 다를수도있으면서도 "객체의 내용"이 같은 경우를 말한다. 
MIT 강의자료에서는 Object Identity를 Referential Equality라고 표현하고있다.

자바에서는 "==" 비교 연산으로 Identity를 비교한다. 
그리고 Equality는 해당 객체의 equals 메소드로 비교하게 된다. 

( 
  사용자 정의 클래스를 처음 만들때 equals 메소드는 기본적으로 참조값이 같은 경우인 Objective Identity한 경우에 true를 반환한다.
  
  왜냐하면 사용자 정의 클래스의 부모클래스는 java.lang.Object인데, 이 클래스에는 equals라는 메소드가 있고 equals 메소드는 기본적으로 참조값을 비교하도록 구현되어있기때문이다.
  
  만일 객체의 필드들을 기준으로 Equality를 비교하고 싶다면 equals 메소드를 오버라이딩해야한다
)

자바와 달리 파이썬은 "=="비교연산으로 Equality를 비교하고 "is"메소드로 Identity를 비교한다.

```java
String str1 = new String("Hello World");
String str2 = new String("Hello World");
String str3 = str1;

System.out.println(str1 == str2)      // false
System.out.pringln(str1 == str3)      // true
System.out.println(str1.equals(str2)) // true

System.out.println(
    System.identityHashCode(str1)
)
// => 0001 ( ** 편의를 위해 출력되는 값을 단순화하겠다)

System.out.println(
    System.identityHashCode(str2)
)
// => 0002

System.out.println(
    System.identityHashCode(str3)
)
// => 0001
```

우선 자바에서의 문자열에 대해 알아야한다.
자바에서 문자열 변수를 생성하는 방법은 두가지이다. 첫번째는 new 키워드를 통해 생성하는 방법이고 두번째는 a = "hello"같이 리터럴(literal)문자열로 생성하는 방법이다. 


첫번째 방법인 new 키워드를 사용하여 문자열 변수를 생성하게되면 new를 사용할때마다 해당 객체가 Heap영역에 저장되게된다.


두번째 방법인 리터럴 문자열로 변수를 생성을 하면 String Constant Pool에 "해당 리터럴 문자열"이 저장된다.

예를들어 String a = "A; b = "A" 라는 코드를 작성하였다면 "A"가 String Constant Pool에 저장되게된다. 
그리고 객체 a, b는 "A"라는 리터럴을 가리키게된다. 그렇기때문에 a, b의 참조값은 같게된다.


본론으로 들어가서 위의 코드를 보자면 
str1과 str2는 new 연산자를 이용하였기에 힙영역에 str1과 str2이 다른 객체로써 따로 저장이 된다.  
str3는 Shallow copy되어 str1과 같은 참조값을 갖게된다. 


그렇기때문에 str1과 str3는 ==비교를 통해 true가 나오고 Object Identity하다. 
또한 System.identityHashCode 메소드를 확인하면 둘의 참조값이 같은것을 볼수있다.

반면 str2와 str1은 각자 따로 new 연산자로 생성이 되었기때문에 다른 객체로써 힙에 따로 할당된것이다. 그렇기에 "=="연산의 결과가 false로 나온다.
### References

[자바에서 변수와 메소드에 대하여 / 클래스 메소드, 클래스 변수 posted by Jbee](http://asfirstalways.tistory.com/160?category=660807)

[점프 투 자바 05장](https://wikidocs.net/214)

[MIT "Software Conversation" Course 강의자료 15](http://web.mit.edu/6.005/www/fa15/classes/15-equality/)

[케빈님의 유튜브 Java: 그가 final로 도배 하는 이유 / 컴파일러 너 내 String 어떻게 했어?! 영상](https://www.youtube.com/watch?v=lcPfxmn0otA&t=7151s)
