## Class

### 자바에서의 클래스를 살펴보자.

#### 클래스 선언 및 정의 

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

#### 상속하기 

```java 
public class Bmw extends Car {
    // 오버라이딩, 오버로딩 등은 다음장에서 설명한다
} 

// class 자식클래스 extends 부모클래스
```


### References

[자바에서 변수와 메소드에 대하여 / 클래스 메소드, 클래스 변수 posted by Jbee](http://asfirstalways.tistory.com/160?category=660807)

[점프 투 자바 05장](https://wikidocs.net/214)


