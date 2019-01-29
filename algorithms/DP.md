---
description: DP(다이나믹 프로그래밍)에 대해 알아보자
date: 2019-01-29
tags: ["알고리즘"]
---
# Dynamic Programming(다이나믹 프로그래밍)

## 다이나믹 프로그래밍은 무엇인가

다이나믹 프로그래밍은 어떠한 문제를 풀기위해 이를 작은 부분문제들로 분할하고, 이 작은 부분문제들의 해답들을 이용해서 더 큰 문제의 해답을 찾는 방법이다.

분할정복(Divide-and-Conquer)과 비슷해보이지만 차이가 존재한다. 분할정복은 Top-down 접근 방식으로 문제를 해결해나간다.
하지만 다이나믹 프로그래밍은 작은 문제들 부터 먼저 해결하면서, 큰문제를 해결하는 Bottom-up 방식이며,
작은 문제들의 답을 저장해두었다가 재계산 없이 가져다가 쓴다는 점에서 차이가 있다.( ISBN 978-1-284-04919-0, page 95-96)

파란색 표지로 유명한 알고리즘 책(ISBN 978-0262033848)이나 저 책(ISBN 978-1-284-04919-0)에서는 다이나믹 프로그래밍을 Bottom-up 방식으로 한정지어서 이야기하고있는데
GeeksForGeeks, 많은 블로그들, CMU 등의 대학강의자료들에서는 Top-Down 방식으로 다이나믹 프로그래밍을 구현하는 경우도 소개하고있고,
다이나믹 프로그래밍을 bottom-up 방식으로 한정짓고있지는 않다는점도 참고하면 좋을것같다.

그래서 사실상 Top-down 방식, Bottom-up 방식으로 다이나믹 프로그래밍을 구분하는것이 의미가 있는지는 모르겠다. 이보다 중요한 다이나믹 프로그래밍의 특징은 이전에 계산해두었던 작은 문제들의 답을 **저장**해두었다가 나중에 사용한다는 것에 있다고본다.

또한 이렇게 결과값을 저장하는 것에 대한 용어의 이름은 Top-down 방식이냐 Bottom-up 방식이냐에따라 다른데,
Top-down 방식으로 부분 문제들의 결과를 저장하는 방식을 메모이제이션(Memoization)이라고 하고,
Bottom-up방식으로 작은 문제들의 결과부터 테이블을 채워나가는 방식을 타뷸레이션(Tabulation)이라고 부른다.
(물론 책에서는 bottom-up으로의 dp만을 다루기에 메모이제이션방식만을 소개한다.)


## 다이나믹 프로그래밍의 이름의 의미는?

"Dynamic Programming"이라는 이름은 control theory 에서 넘어왔고, "Programming"의 뜻은 답을 저장하기 위한 Array(table)를 만든다는 의미라고 한다.
(ISBN 978-1-284-04919-0, page 95-96)

저 책에서는 저렇게 말하고있지만 굳이 다이나믹 프로그래밍이라는 이름 자체를 이해할려안해도 무방할것같다.
다이나믹 프로그래밍이라는 단어를 만든 사람인 Richard Bellman이 자신의 책(ISBN 978-9971966003)에서 다이나믹 프로그래밍이라는 단어가 어떻게
지어졌는지 이야기하는데, 요약하면 이름이 멋져서 다이나믹 프로그래밍이라고 지었다고 말한다.

:::tip
아래 링크는 CMU 대학교에서 공개된 Dynamic Programming 강의 노트인데, 여기서 Richard Bellman 이 DP의 이름의 의미를 이야기하는 부분을 인용해놓았다.

[Dynamic Programming lecture note in cmu](http://www.cs.cmu.edu/afs/cs/academic/class/15210-s15/www/lectures/dp-notes.pdf)
:::

## 다이나믹 프로그래밍의 구성요소

다이나믹 프로그래밍을 적용하기위해서는 첫번째로 **최적 부분 구조(Optimal Substructure)**를 만족하여야한다.
주어진 문제의 최적해(optimal solution)를 부분문제의 최적해를 통해 구할수있다면 **최적 부분 구조(Optimal Substructure)**를 만족한다고 말한다.
예를들어 피보나치 숫자를 구하는 함수를 Fib(int n)이라고 할때 Fib(n)은 Fib(n-1)과 Fib(n-2)라는 부분문제의 최적해를 통해 답이 나올수있으므로 최적 부분 구조를 만족한다.

두번째로 **겹치는 부분 문제(Overlapping Subproblems)**를 만족해야한다. 말그대로 겹치는 부분 문제가 있어야한다.
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
