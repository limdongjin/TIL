---
tags: ["자바"]
---
# HelloWorld 10번 출력하기 구현 예제 모음 using java

## for(), while(), items.forEach()

### 1. for(; ;)

```java
for(int i = 1; i <= 10; i ++){
    System.out.println("Hello World " + i);
}
```

### 2. while()

```java{3}
int i = 1;
while (i < 11 ){
    System.out.println("Hello World " + i);
    i++;
}
```

### 3. for(type item : items)

```java
final int[] OneToTen = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

for(final Integer i : OneToTen){
    System.out.println("for2 Hello World " + i);
}
```

### 4. for(type item : items) , Parallel ( no sequential )
* 병렬처리로 Hello World 출력하기
* HelloWorld가 순서대로 출력되지는 않음.

```
final int[] OneToTen = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

ExecutorService executor = Executors.newFixedThreadPool(5);
for(final Integer i : OneToTen){
    executor.submit(() -> {
        System.out.println("Hello World " + i);
    });
}
executor.shutdown();
```

### 5. items.forEach()

```
final List<Integer> OneToTenList = Arrays
                                     .asList(
                                         new Integer[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
                                     );

OneToTenList.forEach(i -> {
    System.out.println("Hello World " + i);
});
```

## Arrays.stream

### 6. Arrays.stream(..).forEach(..)

```java
final int[] OneToTen = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

Arrays.stream(OneToTen)
       .forEach(
           i -> System.out.println("Hello World " + i)
       );
```

### 7.  Arrays.stream(..).mapToObj(..).forEach(..)

```java
final int[] OneToTen = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

Arrays.stream(OneToTen)
       .mapToObj(i -> "HelloWorld "+ i)
       .forEach(System.out::println);
```

## IntStream

### 8. IntStream.range(..).forEach(..)

```java
IntStream.range(1, 11) // start inclusive, end exclusive
          .forEach(
              i -> System.out.println("Hello World " + i)
          );
```
### 9. IntStream.range(..).mapToObj(..).forEach(..)
```java
IntStream.range(1, 11)
          .mapToObj(
              i -> "Hello World " + i
          )
          .forEach(System.out::println);

```

### 10. IntStream.rangeClosed(..).forEach(..)

```java
IntStream.rangeClosed(1, 10) // start inclusive, end inclusive
           .forEach(
               i -> System.out.println("Hello World " + i)
           );

```

## Stream

### 11. Stream.iterate(..).limit(..).forEach(..)

```java
Stream.iterate(1, n -> n + 1)
       .limit(10)
       .forEach(
           i -> System.out.println("Hello World "+ i)
       );
```

### 12. Stream with List1

```java
final List<Integer> OneToTenList = Arrays
                                     .asList(
                                         new Integer[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
                                     );
OneToTenList.stream()
             .forEach(i -> {
                 System.out.println("Hello World " + i);
             });
```

### 13. Stream with List2 (no sequential)

```java
final List<Integer> OneToTenList = new ArrayList<>();
Stream.iterate(1, n -> n+1)
        .limit(10)
        .forEach(i -> OneToTenList.add(i));

OneToTenList.stream()
             .parallel()
             .forEach(
                 i-> System.out.println("Hello")
             );
```

### 14. Stream with List3 (no sequential)

```java
final List<Integer> OneToTenList = Arrays
                                     .asList(
                                         new Integer[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
                                     );
OneToTenList.parallelStream()
                .forEach(i -> {
                   System.out.println("Hello World " + i);
                });
```

<TagLinks />

<Disqus />
