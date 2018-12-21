
# 자바로 알아보는 Array

이 문서는 Java의 기본적인 Array를 다룬다.

## Array란? 

Array는 동일한 유형의 데이터를 연속 메모리 위치에 저장할수있는 자료 구조이다.

## `Array in Java` vs `Array in C`

C 배열과 Java 배열의 `차이점` 

1. 자바의 모든 배열은 동적으로 할당된다.
```java
// Java

int[] intArray; // 선언
intArray = new int[20]; // 런타임에 메모리가 할당된다 Dynamic Allocation

/* 물론 배열의 크기를 지정한 이후에는 변경할수없다. */
```
```c
// C

int a[20]; // 컴파일타임에 메모리가 할당된다. Static Allocation

int* aaa = (int*)malloc(sizeof(int)*20); // Dynamic Allocation Array in C

/* 즉 C는 배열을 정적할당으로도 선언할수있고 동적할당으로 선언할수도있다. */
```
2. 자바에서 배열은 객체이기때문에 length 메소드를 사용하여 배열의 길이를 찾을수있다.
```java 
// Java 

int[] intArray = new int[20];
System.out.println(intArr.length) // 20

/* 사실 이 특징은 그리 특별하지는 않다. */
```

```c++ 
// C

int a[20];
printf("%d", (int)(sizeof(a) / sizeof(int))); // 20

/* C는 배열의 길이를 구하기위해서는 해당 배열 변수의 메모리 크기로 알아내야한다*/
```
3. 자바에서는 data type앞에 []를 붙이는 형식으로 배열을 선언한다.   
``` 
int[] intArr;
boolean[] boolArr;
double[] doubArr;
Student[] students; // 별도로 정의한 Student 클래스 객체 
```

## 선언 및 정의 
```java 
type[] anArr; // 'type'의 배열 선언, ex) String[] anArr;
anArr = new type[10]; // 길이를 10으로 할

anArr[0] = value; // 인덱스 접근하여 초기화 할수도있음.

// or 

type2[] anArr2 = new type2[]{ val, val1, val2 , val3 }

// or 

type3 anArr3[] = new type3[11];
```

## 초기값

자바에서는 할당만 하고 초기화하지 않았을때는 type에 따라 초기값이 설정된다. 

* int[] 초기값: 0
* double[] 초기값: 0.0
* String[] 초기값: null
* boolean[] 초기값: false

## 배열 반복 접근

``` 
// java code but c style

int[] intArr = new int[]{ 1, 2, 3, 4, 1, 2};
for(int i=0;i<intArr.length;i++){
    System.out.println(intArr[i]);
}
```

```
// For-each style

int[] intArr = new int[]{ 1, 2, 3, 4, 1, 2};
for(int elem : intArr){
   System.out.println(elem);
}
 ```

## 배열의 한계점 / 장점

* 할당을 하고난후에는 크기가 고정적이다.
* 추가,삭제의 비용이 크다.
* 기능이 없음
* (장점)인덱스가 있다. 빠른 조회 가능. 
* (장점)데이터를 순차적으로 나열할수있다. 성능 향상에 도움이됨.

배열의 장점이 단점을 커버할수있는 경우가 아니라면 List를 쓰는 것이 좋아보인다.
자바 util 패키지에서 ArrayList와 LinkedList라는 List 를 지원한다. 

(* 엄밀히 말하면 ArrayList와 LinkedList는 트리로 구현이 되어있다.)

## Reference

[Array in java :: GeeksorGeeks](https://www.geeksforgeeks.org/arrays-in-java/)

[Arrays :: study.cs50.net ](https://study.cs50.net/arrays)

[Arrays part in Oracle Java Tutorial](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html)

<ClientOnly>
<Disqus />
</ClientOnly>
