---
description: Leetcode 3. Longest-Substring-Without-Repeating-Characters 풀기
image: /images/Leetcode.png
tags: ["problemsolving","leetcode","java"]
---

# [Leetcode] 3. Longest-Substring-Without-Repeating-Characters

::: tip
[문제 링크](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
:::

## 문제 설명

Given a string, find the length of the longest substring without repeating characters.

Example 1:
```
Input: "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

Example 2:

```
Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

Example 3:

```
Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

## 문제 이해

1. 같은 문자가 두번이상 나오면 안된다.
2. 연속된 substring만을 카운팅한다.

Input 문자열을 첫번째 인덱스부터 순차적으로 돌면서 substring을 구하는 것을 보면 일정한 패턴이 있다.
조건이 깨지는 상황은 기존에 만들었던 substring의 첫번째 문자에서 깨지는것을 볼수있다.
예를들어 abcabdbb의 경우 a ab abc까지 가다가 abca에서 조건이 깨지게된다. 그래서 다시 bc부터 조건에 맞는 substring을 구하게된다.

즉 단순화하면 조건이 깨질때는( 같은 문자가 이미 substring에 존재할때 ) substring의 시작인덱스를 1증가시키고, 조건이 만족할때는 substring의 끝인덱스를 1증가시킨다.
이 루틴을 인덱스가 문자열의 끝에 닿을때까지 반복하면 가장 긴 substring의 길이를 구할수있다.

## 풀이 코드 - 27ms

```java
import java.util.HashSet;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        // 한 글자씩만 나와야한다. ex, abca 는 a 가 두번나오므로 안된다.
        int maxLength = 0;
        int i=0, j=0;
        int length = s.length();
        HashSet<Character> stringSet = new HashSet<>();

        while (j < length) {
            if(i > j) break;
            if (!stringSet.contains(s.charAt(j))){
                stringSet.add(s.charAt(j++));
                maxLength = Math.max(maxLength, j - i);
                continue;
            }
            stringSet.remove(s.charAt(i++));

        }

        return maxLength;
    }

}
```

시간복잡도: O(N)

:::tip
[소스 코드](https://github.com/limdongjin/ProblemSolving/blob/master/Leetcode/Longest-Substring-Without-Repeating-Characters/src/main/java/Solution.java)
:::

:::tip
[테스트 코드](https://github.com/limdongjin/ProblemSolving/blob/master/Leetcode/Longest-Substring-Without-Repeating-Characters/src/test/java/SolutionTest.java)
:::
