---
meta:
 - name: description
   content: leetcode twosum 문제를 풀어보자 feat, HashMap
 - property: og:image
   content: https://limdongjin.github.io/images/LeetCode.png
tags: ["problemsolving", "leetcode", "java", "hashmap"]
---
# [Leetcode] 1. Two Sum

:::tip
[문제 링크](https://leetcode.com/problems/two-sum/)
:::

## 문제 설명

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

```
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```

## 무식하게 풀어보기 - 47ms

target 이 나올수있는 두 요소의 조합을 순차적으로 찾아간다.

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int nums_length  = nums.length;
        for(int i=0; i < nums_length - 1; ++i){
            for(int j=i+1; j < nums_length; ++j){
                if(nums[j] == target - nums[i]){
                    return new int[]{i, j};
                }
            }
        }
        return new int[2];
    }
}
```
시간복잡도 : O(n^2)
<br />

Runtime : 47ms, faster than 15.54% of Java online submissions for Two Sum.

## List의 lastIndexOf 메소드로 풀어보기 - 125ms

더 느려졌다..

```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        int i, resIdx;
        int nums_length = nums.length;
        List<Integer> arrayListNums = new ArrayList<>();
        for(final int num : nums){
            arrayListNums.add(num);
        }
        for(i=0;i<nums_length;++i){
            resIdx = arrayListNums.lastIndexOf(target - nums[i]);
            if(resIdx != -1 && resIdx != i){
                System.out.println(resIdx);
                return new int[]{i, resIdx};
            }
        }
        return new int[]{1, 2};
    }
}
```

Runtime: 125 ms, faster than 2.39% of Java online submissions for Two Sum.

ArrayList::lastIndexOf 메소드의 내부소스를 확인해보자!
```java
// ArrayList::lastIndexOF 내부 소스 코드
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    public int lastIndexOf(Object o) {
            if (o == null) {
                for (int i = size-1; i >= 0; i--)
                    if (elementData[i]==null)
                        return i;
            } else {
                for (int i = size-1; i >= 0; i--)
                    if (o.equals(elementData[i]))
                        return i;
            }
            return -1;
    }
}
```

lastIndexOf 메소드의 시간복잡도는 O(N)이고, 이를 N번 호출하므로 O(N^2)이 된다.
시간복잡도는 O(n^2) 으로 추정된다.

아마 런타임이 저정도로 느려진이유는 int[] 요소들을 ArrayList로 옮기는 시간이 더 소요되기때문인것같다.

lastIndexOf 메소드를 int[] 배열에서 바로 사용할수있도록 자체구현을 하였다면 "무식하게 풀어보기"의 Runtime 과 비슷하게나올것같다.

## HashMap으로 구현해보기 - 6ms

```java
import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        int nums_length = nums.length;
        Integer res;

        for(int i=0;i<nums_length;i++){
            res = map.get(nums[i]);
            if(res != null){
                return new int[]{res, i};
            }else{
                map.put(target - nums[i], i);
            }
        }
        return new int[]{1,2};
    }
}
```
시간복잡도 : O(N)

Runtime: 6 ms, faster than 72.77% of Java online submissions for Two Sum.
