---
prev: /java/design-pattern/
---
# Template Method Pattern 

## What is Template Method Pattern 

> In software engineering, the template method pattern is a behavioral design pattern that defines the program skeleton of an algorithm in an operation, deferring some steps to subclasses. - Design Patterns: Elements of Reusable Object-Oriented Software

알고리즘의 골격을 정해두고, 알고리즘 골격의 일부 스텝의 구현은 서브 클래스에서 오버라이드해서 재정의하도록 하는 디자인 패턴이다. 

## 언제 Template Method Pattern 을 주로 사용하는가(or 사용할수있는가?)

알고리즘의 골격은 같지만, 각 스텝들의 구현이 달라지는 경우에 사용한다. 그래서 알고리즘의 골격을 변경하지 않고 다른 알고리즘을 구현할수있게된다.

<br>
Template Method Pattern은 프레임워크들의 내부 구현에 주로 사용된다. 도메인에 따라서 소프트웨어가 달라질수도 있으니 이런 도메인 영역을 "placeholder"로 놓는 식의 개념으로 구현되는것이다. 대표적인 예시로는 IOC가 있다.

## Detail of Template Method Patten

Template Method 패턴의 샘플 UML class Diagram 은 다음과 같은 모습를 갖는다.

<img src="/images/uml-template-pattern.jpg">

Base Class에는 templateMethod라는 메소드가 있는데, Template Method Pattern 에서 알고리즘의 골격을 나타내는 메소드를 "Template Method"라고 부른다. Base Class의 메소드인 "Template Method"에서 서브클래스에서 구현하게될 메소드들을 호출하면서 알고리즘의 골격을 정의하게 된다. 

<br> 
피상속 클래스에서는 Base Class의 abstract 메소드를 오버라이딩하여 구현히게된다. 

## Example :: Build House using Template Method Pattern

유리집과 나무집을 만들어볼려한다. 만일 유리집과 나무집을 짓기위해 필요한 재료나 세부사항은 달라도 짓는 알고리즘의 골격이 같다면  Template Method Pattern을 적용하여 구현할수있다.

<br>

1. 집 짓는 알고리즘의 골격 : 기반(Foundation)을 다지고, 기둥(Pillar)을 세우고, 벽(Wall)을 짓고, 창문(Window)을 붙인다.

<br>

2. 기반(Foundation)을 다지고, 창문(Window)을 붙이는 과정은 나무집,유리집 모두 똑같다고 설정하겟다.

<br>

3. Example에 대한 소스는 [limdongjin/design-patterns](https://github.com/limdongjin/design-patterns/tree/master/template-method-pattern) 레포지토리에 에 저장하였다.

<br>

4. 아래의 UML 다이어그램은 우리가 구현하게될 클래스간의 다이어그램이다.

<img src="/images/uml-template-pattern-house.png">

```java
/* Base Class */
public abstract class BuildHouseMethod {

    // template method
    public final void buildHouse(){
        buildFoundation();
        buildPillars();
        buildWalls();
        buildWindows();
    }

    private void buildWindows(){
        System.out.println("Build Window!");
    }

    protected abstract void buildWalls();
    protected abstract void buildPillars();

    private void buildFoundation() {
        System.out.println("Building foundation with cement,iron rods and sand");
    }

}
```

Template Method는 buildHouse()인것을 확인할수있다. 또한 abstract 메소드들을 protected로 선언하여 서브클래스에서만 접근이 가능하게해야한다.

```
// 나무집 짓는 클래스
public class BuildWoodenHouseMethod extends BuildHouseMethod {
    @Override
    protected void buildWalls() {
        System.out.println("Build Wooden Walls!");
    }

    @Override
    protected void buildPillars() {
        System.out.println("Build Wooden Pillars!");
    }
}
```

```
// 유리집 짓는 클래스
public class BuildGlassHouseMethod extends BuildHouseMethod {
    @Override
    protected void buildWalls() {
        System.out.println("Build Glass Walls!!");
    }

    @Override
    protected void buildPillars() {
        System.out.println("Build Glass Pillars!");
    }
}
```

위와 같이 BuildWoodenHouseMethod 클래스와 BuildGlassHouseMethod 클래스가 구현이 된것을 볼수있다. 
우리는 이를 House 객체에 주입하는 방식으로 사용할수있다. 

```
// 위의 집 짓는 객체를 House 객체에 주입하는 방식을 사용하였다.
public class House {
    private BuildHouseMethod build_method;

    public House(BuildHouseMethod build_method) {
        this.build_method = build_method;
    }

    public void build(){
        build_method.buildHouse();
    }

}
```

```
// 실행 시키기위한 클래스
public class App {
    public static void main(String[] args) {
        House glassHouse = new House(new BuildGlassHouseMethod());
        glassHouse.build();

        House woodenHouse = new House(new BuildWoodenHouseMethod());
        woodenHouse.build();
    }
}
```

실행시켜보면 아래와 같이 콘솔에 잘 출력되는것을 볼수있다.

```
// output
Building foundation with cement,iron rods and sand
Build Glass Pillars!
Build Glass Walls!!
Build Window!
Building foundation with cement,iron rods and sand
Build Wooden Pillars!
Build Wooden Walls!
Build Window!
```



## References

[Dzone :: Template Method Pattern Tutorial with Java Examples](https://dzone.com/articles/design-patterns-template-method)

[JournalDev :: Template Method Design Pattern in Java](https://www.journaldev.com/1763/template-method-design-pattern-in-java)

[Gamma, Erich; Helm, Richard; Johnson, Ralph; Vlissides, John (1994). "Template Method". Design Patterns. Addison-Wesley. ](#)

[Sample UML image reference](http://w3sdesign.com/?gr=b10&ugr=struct)
