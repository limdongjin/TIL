---
meta:
 - name: description
   content: leetcode 2. add two numbers 풀기!
 - property: og:image
   content: https://limdongjin.github.io/images/LeetCode.png
tags: ["problemsolving", "leetcode", "java"]
---

# [Leetcode] 2. Add Two Numbers

:::tip
[문제 링크](https://leetcode.com/problems/add-two-numbers/)
:::

## 문제 설명

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:

```
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
```

Solution Example:
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {

    }
}
```
## ListNode 클래스

makeLinkedList, linkedListToList, printLinkedList 메소드는
테스트의 편의성을 위해 만들었다.

```java {10, 24, 37}
import java.util.ArrayList;
import java.util.List;

public class ListNode {
    int val;
    ListNode next;

    ListNode(int x) { val = x; }

    public static ListNode makeLinkedList(int[] elements){
        ListNode res = new ListNode(elements[0]);
        ListNode nextNode;
        ListNode point = res;

        for(int i = 1; i < elements.length; ++i) {
            nextNode = new ListNode(elements[i]);
            point.next = nextNode;
            point = nextNode;
        }

        return res;
    }

   public static void printLinkedList(ListNode linkedList){
        ListNode point;
        point = linkedList;

        System.out.print(point.val);
        while (point.next != null) {
            System.out.print(" -> ");
            point = point.next;
            System.out.print(point.val);
        }
        System.out.println("\n");
   }

   public static List linkedListToList(ListNode linkedList){
       ListNode point;
       List<Integer> res = new ArrayList();

       point = linkedList;
       res.add(point.val);
       while (point.next != null){
           point = point.next;
           res.add(point.val);
       }
       return res;
    }
}
```
:::tip
[테스트 코드](https://github.com/limdongjin/ProblemSolving/blob/master/Leetcode/Add-Two-Numbers/src/test/java/SolutionTest.java)
:::

## 처음 생각해낸 풀이 - 오답

1. l1, l2 링크드리스트를 각각 숫자로 바꾸자
2. 둘을 더한다.
3. 더해진 숫자를 링크드리스트로 바꾼다.

```java{2,3,4}
public class WrongSolution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        return longToLinkedList(linkedListToLong(l1) + linkedListToLong(l2));
    }

    private static long linkedListToLong(ListNode linkedList){
        ListNode point = linkedList;
        long res = point.val;
        long weight = 10;

        while (point.next != null){
            res += point.next.val * weight;
            point = point.next;
            weight *= 10;
        }
        return res;
    }

    private static ListNode longToLinkedList(long value){
        ListNode res = new ListNode((int)(value % 10));
        ListNode point = res;
        ListNode next;
        value /= 10;

        while (value != 0){
            next = new ListNode((int)(value % 10));
            value /= 10;
            point.next = next;
            point = next;
        }
        return res;
    }
}
```

long 정도 범위의 테스트 케이스에는 통과한다!

하지만 long을 넘어가는 범위는 감당하지못한다. 그렇다고해서 BigInt를 쓰기에는 뭔가 해답이 아닌것같았다.

```
// 숫자로 변환하기에는 숫자가 너무나도 크다...
l1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
l2 = [5, 6, 4]
answer = [6,6,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
```

## 다시 생각해낸 풀이 - 정답 44ms

l1, l2 링크드리스트를 한칸씩 이동하면서 같은 자리수끼리 더한 링크드리스트를 반환한다!
```
// psudo code
carry = 0
for i=0 ~ :
    sum = ( l1[i].val + l2[i].val + carry )
    res[i].val = sum % 10
    carry = sum / 10
if carry != 0 :
    res[-1].val = 1
```

```java
public class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode point1 = l1;
        ListNode point2 = l2;
        ListNode point3;

        ListNode res;
        ListNode node;

        int sum;
        int carry = 0;

        sum = sumNode(point1, point2);

        carry = sum / 10;
        sum = sum % 10;

        res = new ListNode(sum);

        point1 = point1.next;
        point2 = point2.next;
        point3 = res;

        while (point1 != null || point2 != null){

            sum = sumNode(point1, point2);
            sum += carry;

            carry = sum / 10;
            sum = sum % 10;

            node = new ListNode(sum);

            point3.next = node;
            point3 = node;

            if(point1 != null) point1 = point1.next;
            if(point2 != null) point2 = point2.next;
        }

        if(carry != 0){
            point3.next = new ListNode(1);
        }

        return res;
    }

    private static int sumNode(ListNode point1, ListNode point2){
        int sum = 0;
        if(point1 != null) sum += point1.val;
        if(point2 != null) sum += point2.val;
        return sum;
    }
    // Runtime: 44 ms, faster than 39.03% of Java online submissions for Add Two Numbers.
}
```
