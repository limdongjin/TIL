---
description: DP(다이나믹 프로그래밍)에 대해 알아보자
date: 2019-01-29
tags: ["알고리즘"]
---
# Dynamic Programming(다이나믹 프로그래밍)

## 다이나믹 프로그래밍은 무엇인가

다이나믹 프로그래밍은 어떠한 문제를 풀기위해 이를 작은 부분문제들로 분할하고, 이 작은 부분문제들의 해답들을 이용해서 더 큰 문제의 해답을 찾는 방법이다.

분할정복(Divide-and-Conquer)과 비슷해보이지만 차이가 존재한다. 
다이나믹 프로그래밍은 부분 문제들의 답을 저장해두었다가 재계산 없이 가져다가 쓴다는 점에서 차이가 있다.

## 다이나믹 프로그래밍의 이름의 의미는?

다이나믹 프로그래밍이라는 단어를 만든 사람인 Richard Bellman이 자신의 책(ISBN 978-9971966003)에서 다이나믹 프로그래밍이라는 단어가 어떻게
지어졌는지 이야기하는데, 요약하면 이름이 멋져서 다이나믹 프로그래밍이라고 지었다고 말한다.

:::tip
아래 링크는 CMU 대학교에서 공개된 Dynamic Programming 강의 노트인데, 여기서 Richard Bellman 이 DP의 이름의 의미를 이야기하는 부분을 인용해놓았다.

[Dynamic Programming lecture note in cmu](http://www.cs.cmu.edu/afs/cs/academic/class/15210-s15/www/lectures/dp-notes.pdf)
:::

## 다이나믹 프로그래밍의 구성요소

다이나믹 프로그래밍을 적용하기위해서는 첫번째로 **최적 부분 구조(Optimal Substructure)** 를 만족하여야한다.
주어진 문제의 최적해(optimal solution)를 부분문제의 최적해를 통해 구할수있다면 **최적 부분 구조(Optimal Substructure)** 를 만족한다고 말한다.
예를들어 피보나치 숫자를 구하는 함수를 Fib(int n)이라고 할때 Fib(n)은 Fib(n-1)과 Fib(n-2)라는 부분문제의 최적해를 통해 답이 나올수있으므로 최적 부분 구조를 만족한다.

두번째로 **겹치는 부분 문제(Overlapping Subproblems)** 를 만족해야한다. 말그대로 겹치는 부분 문제가 있어야한다.
예를들어 Fib(n)을 구하기 위해 Fib(n-2)라는 부분문제의 답이 필요한데, Fib(n-1)을 구하기위해서도 Fib(n-2)라는 부분문제의 답이 필요하다. 이런경우 **겹치는 부분 문제(Overlapping Subproblems)**
를 만족한다고 말한다.
DP에서는 저렇게 겹치는 경우에는 값을 테이블(또는 array)에 저장해두었다가 나중에 재계산을 하지않고 테이블에서 꺼내서 재사용한다.
이는 분할정복 방식과의 가장 큰 차이점이기도 하다.

## References

[Dynamic Programming lecture note in cmu](http://www.cs.cmu.edu/afs/cs/academic/class/15210-s15/www/lectures/dp-notes.pdf)

[Foundations of Algorithms 5th Edition ISBN 978-1-284-04919-0](https://www.amazon.com/Foundations-Algorithms-Richard-Neapolitan/dp/1284049191)

[Eye of the Hurricane: An Autobiography ISBN 978-9971966003](https://www.amazon.com/Hurricane-Autobiography-Richard-Ernest-Bellman/dp/997196600X)

[geeksforgeeks Optimal Substructure Property in Dynamic Programming | DP-2](https://www.geeksforgeeks.org/optimal-substructure-property-in-dynamic-programming-dp-2/)

[Tabulation vs Memoizatation](https://www.geeksforgeeks.org/tabulation-vs-memoizatation/)
