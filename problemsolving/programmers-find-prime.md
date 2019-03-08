---
description: 프로그래머스 소수 찾기 문제 풀기 (파이썬)
date: 2019-03-08
tags: ["problemsolving", "프로그래머스"]
---
# 프로그래머스 소수 찾기 문제 풀기 (파이썬)

[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/42839?language=python3)

한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.
<br>

각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.

## 단순화 및 solution 함수 작성

먼저 문제를 단순화해보면 다음과 같다.

```
1. numbers 문자열을 통해 만들수있는 숫자들을 p_numbers 라는 리스트에 저장한다.
ex) p_numbers = [1, 7, 17, 71] if numbers="17"

2. p_numbers 에 들어있는 소수들의 개수가 최종 답이 된다.
ex) 7, 17 71이 소수이므로 답은 3이다.
```

세부 구현을 함수로 추상화한후, solution 함수를 작성하면 아래와 같다.

```python
def solution(numbers):
    answer = 0
    p_numbers = possible_numbers(numbers)
    for num in p_numbers:
        answer += is_prime_number(num) # 소수라면 1, 아니라면 0
    return answer

def possible_numbers(number):
    pass
def is_prime_number(number):
    pass
```

## 테스트 코드 작성

```python
def test_solution():
    assert solution("17") == 3
    assert solution("011") == 2

def test_possible_numbers():
    p1 = possible_numbers("17")
    p1.sort()
    p2 = possible_numbers("011")
    p2.sort()
    assert p1 == [1, 7, 17, 71]
    assert p2 == [0, 1, 10, 11, 101, 110]
```

## possible_numbers 함수 구현

```python
# 옵션1: from itertools import permutations
# 옵션2: def permutations(iter, r=None): ~~

def possible_numbers(numbers):
    result = []
    for i in range(1, len(numbers) + 1):
        for tup in permutations(numbers, r=i):
            result.append(int("".join(tup)))
    return list(set(result))
```

numbers 문자열를 통해 만들수 있는 모든 숫자를 구하기위해서는

1. numbers 를 통해 만들수있는 모든 순열(permutation)을 구해야한다. 그렇기때문에 permutations 함수를 구현하거나, 라이브러리를 사용하여야한다.

2. permutations(numbers, 1) ~ permutations(numbers, n) 순열들을 구하고 ('1', '7', ) 과 같은 형태의 튜플을 숫자로 변환해서 result 리스트에 넣고 set 으로 중복을 제거한후 리스트 형태로 리턴한다.
