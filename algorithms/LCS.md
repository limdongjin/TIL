---
description: LCS(Longest Common Subsequence) 개념 및 자바로 구현
tags: ["알고리즘"]
---
# LCS(Longest Common Subsequence) 개념 및 자바 구현 

## LCS(Longest Common Subsequence) 란

LCS(Logest Common Subsequence)는 말그대로 "가장 긴 공통 부분 수열"이다. 이를 나눠서 바라보자.

1. "가장 긴" ( Longest )
2. "공통" ( Common )
3. "부분 수열" ( Subsequence )

즉 우리는 LCS(Longest Common Subsequence)의 의미를 이해하기위해서는 "부분 수열"(Subsequence)이 무엇인지 알아야한다.
먼저 Sequence에 대해 알아보자.

## Sequence 정의

> A sequence is an ordered set of mathematical objects. Sequences of object are most commonly denoted using braces. - wolfram

Sequence(수열)는 Ordered Set 이다. 즉 순서가 있는 요소들의 집합이다.

그리고 Sequence는 <a, b, c, d>와 같은 형태로 표현을 할수있다.
s = "hello world"와 같은 문자열이 있을때 이는 그 자체로 Sequence의 표현으로 볼수 있다.

풀어서 보면 아래와 같은 문자들의 순서집합으로 볼수도 있다.
<(1,'h'),(2,'e'),(3,'l'),(4,'l'),(5,'o'),(6,' '),(7,'w'),(8,'o'),(9,'r'),(10,'l'),(11,'d')>

주의할점은 "문자가 중복되니까 Set이 아닌것같은데" 라고 생각할수도있지만, 각 문자에는 인덱스값이 있기때문에 hello의 o와 world의 o는 다른 o로 취급해야한다.

또한 수학적 정의에 의하면 Sequence의 정의역은 자연수 집합이므로 첫요소의 인덱스는 0이 아니라 1이라는 것도 주의해야한다.
물론 코드로의 구현적 편의를 위해 인덱스를 0으로 해도 무방할수도 있다.

:::tip
[cmu Sequence lecture note](http://www.cs.cmu.edu/afs/cs/academic/class/15210-s15/www/lectures/seq-notes.pdf)
에서는 Sequence의 기술적 구현에 대해서 구체적으로 알려주고있다.
:::

## Subsequence는 무엇

s라는 sequence가 있을때 s의 Subsequence는 s의 일부요소들을 원래의 순서를 지키면서 순서대로 나열해서 얻을수있는 수열이다.
s = hello world 라고 할때 s의 subsequnce로 hwd가 있을수도있고 lwd가 있을수있다. 그렇지만 기존 순서를 깬 ohd같은 경우는 subsequnce가 아니다.

## LCS를 다시 이해해보자

처음에 말했듯 LCS는 가장 긴 공통 부분 수열을 의미한다. 우리는 이제 Subsequnce(부분수열)의 의미를 알고있으니 LCS를 쉽게 이해할수있다.

s = cdabe

a = cdegt

라는 문자열이 있을때 s와 a의 공통 subsequence로는 {}, {c}, {d},{c,d} ... {c,d,e}가 있고,
이중에서 {c,d,e}라는 subsequence가 가장 길기때문에 이것이 바로 LCS(Longest Common Subsequence)가 된다.

## LCS를 DP(Dynamic Programming)으로 풀어보자

먼저 DP로 풀수있는지 확인해야한다. Optimal Structure를 갖고있는지 확인해야한다.

우선 들어가기에 앞서 X = <x<sub>1</sub>, x<sub>2</sub>, x<sub>3</sub>, ... , x<sub>i</sub>, ... , x<sub>n</sub>>,
Y = <y<sub>1</sub>, y<sub>2</sub>, y<sub>3</sub>, ... y<sub>j</sub>, ... , y<sub>m</sub>> 문자열이 있다고 하고, LCS의 길이를 구하는 함수를 LCS()라고 하자.
(X의 각 요소의 인덱스는 i이고 Y의 각 요소의 인덱스는 j라고한다.)

(i, j)와 (X<sub>i</sub>, Y<sub>j</sub>)에 대하여 점화식을 세워보자. 즉 경우에 따른 LCS() 식을 세워보자.

#### case 1. i 또는 j가 0인 경우 ( 길이가 0이라는 의미 )

수열 K의 인덱스 k 는 1부터 시작되는데, k가 0이라는 의미는 수열 K의 길이가 0이라는 의미를 갖는다.

한쪽의 문자열의 길이가 0이면 공통된 부분은 존재하지않기때문에 LCS의 길이는 0이된다.

<strong>LCS(X<sub>i</sub>, Y<sub>j</sub>) = 0</strong>

#### case 2. X<sub>i</sub> 와 Y<sub>j</sub> 가 같은 경우

이는 X<sub>i</sub>와 Y<sub>j</sub>가 LCS(X<sub>i</sub>, Y<sub>j</sub>)의 마지막 문자라는 것이다.
그렇기에 이 마지막 요소는 상수 1로 대체될수있고, 마지막요소를 제외한 부분의 LCS는 결국 i j의 인덱스를 1씩 빼서 LCS(X<sub>i-1</sub>, Y<sub>j-1</sub>)로 일반화할수있다.

<strong>LCS(X<sub>i</sub>, Y<sub>j</sub>) = LCS(X<sub>i-1</sub>, Y<sub>j-1</sub>) + 1</strong>

#### case 3.  X<sub>i</sub> 와 Y<sub>j</sub> 가 다른 경우 (i != 0 && j != 0)

X<sub>i</sub>와 Y<sub>j</sub>가 같지않다는 것은 LCS(X<sub>i</sub>, Y<sub>j</sub>)의 마지막 문자가 아래 세가지 경우중의 하나라는 것이다.

1. (X<sub>i</sub> == Y<sub>j - 1</sub>), (X<sub>i</sub> == Y<sub>j - 2</sub>) , ...
2. (X<sub>i - 1</sub> == Y<sub>j</sub>), (X<sub>i - 2</sub> == Y<sub>j </sub>), ...
3. (X<sub>i - 1</sub> == Y<sub>j -1 </sub>),  (X<sub>i - 2</sub> == Y<sub>j -1 </sub>), ...

1의 경우는 결국 LCS(X<sub>i</sub>, Y<sub>j - 1</sub>)로 단순화 할수있다. 왜냐하면 i, j-3에 마지막 문자가 있더라도 LCS(X<sub>i</sub>, Y<sub>j - 1</sub>)에 포함이 되기때문이다.
2의 경우도 마찬가지 논리로 LCS(X<sub>i - 1</sub>, Y<sub>j</sub>)로 단순화 할수있다.
3의 경우는 1또는 2에서 일반화한 식에 결국 포함이 되게된다.

그렇기때문에 LCS(X<sub>i</sub>, Y<sub>j - 1</sub>)과 LCS(X<sub>i - 1</sub>, Y<sub>j</sub>)중에 가장 큰 것이 LCS(X<sub>i</sub>, Y<sub>j</sub>)가 된다.

<strong>LCS(X<sub>i</sub>, Y<sub>j</sub>) = MAX(LCS(X<sub>i-1</sub>, Y<sub>j</sub>), LCS(X<sub>i</sub>, Y<sub>j-1</sub>))</strong>

#### 결론

즉 Xi와 Yi의 LCS는 부분 LCS들로 부터 답이 나오는것을 볼수있다.
이는 Optimal Structure를 만족한다는 것을 의미하고 DP를 사용할수있다는 것을 의미한다.

## 재귀로 구현한 LCS 코드

```java
import java.util.HashMap;

public class Lcs {
    private HashMap<String, Integer> cache;

    public final int length(String x, String y){
        cache = new HashMap<>();
        return _length(x, y, x.length() - 1, y.length() - 1);
    }

    private int _length(final String x, final String y, final int xi, final int yi){
        String key_name = xi + "," + yi;
        int result;
        if(xi == -1 || yi == -1) return 0;
        if(cache.containsKey(key_name)) return cache.get(key_name);

        if(x.charAt(xi) == y.charAt(yi)) result = _length(x, y, xi -1, yi -1) + 1;
        else result = Math.max(_length(x, y, xi -1, yi), _length(x, y, xi, yi-1));

        cache.put(key_name, result);

        return result;
    }
}
```

:::tip
[소스 코드](https://github.com/limdongjin/ProblemSolving/blob/master/Algorithms/LCS/src/main/java/Lcs.java)

[테스트 코드](https://github.com/limdongjin/ProblemSolving/blob/master/Algorithms/LCS/src/test/java/LcsTest.java)
:::

## References

[MAT25 LECTURE 8 NOTES in ucdavis](https://www.math.ucdavis.edu/~npgallup/m17_mat25/lecture_notes/lecture_8/m17_mat25_lecture_8_notes.pdf)

[cmu Sequence lecture note](http://www.cs.cmu.edu/afs/cs/academic/class/15210-s15/www/lectures/seq-notes.pdf)

[cmu Design & Analysis of Algorithms lecture note](http://www.cs.cmu.edu/afs/cs/academic/class/15451-s15/LectureNotes/lecture04.pdf)

[wolfram Sequence definition](http://mathworld.wolfram.com/Sequence.html)

[wolfram Subsequence definition](http://mathworld.wolfram.com/Subsequence.html)

[stanford cs161 lecture13](http://web.stanford.edu/class/archive/cs/cs161/cs161.1176/Lectures/CS161Lecture13.pdf)
