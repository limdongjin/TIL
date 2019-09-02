---
description: SIC(Simplified Instructional Computer)의 주요 Instruction Sets 에 대해 알아보자
tags: ["시스템프로그래밍"]
---
# [SP-3] SIC의 주요 Instruction Sets

이 글은 SIC 의 주요 Instruction Sets을 설명하는 글입니다. 모든 Instruction 을 설명하지는 못하기때문에 이 [링크]([http://solomon.ipv6.club.tw/Course/SP.941/sic-instruction.html](http://solomon.ipv6.club.tw/Course/SP.941/sic-instruction.html))를 참고하길 바랍니다

## Instruction Sets (SIC)

SIC 는 아래와 같은 Instruction Sets 을 갖는다. 또한 다른 특성들과 마찬가지로 SIC/XE 에도 상위 호환이 됩니다. 

- Instruction Sets
    - Data Movement(load 와 store): LDA, LDX, STA, STX, ...
    - Arithmetic: ADD, SUB, MUL, DIV, ...
    - 비교(Comparison): COMP, ...
    - Conditional Jump: JEQ, JLT, JGT, ...
    - Jump to Subroutine: JSUB
    - Return from Subroutine: RSUB
    - RESW, RESB, WORD, BYTE, ...

### SIC 코드 예시

```
COPY   START  0
FIRST  STL    RETADR
       LDB    #LENGTH
       BASE   LENGTH
CLOOP  +JSUB  RDREC
       LDA    LENGTH
HELLO  RESW   1
```

### Data Movement (load , store)

- load : memory ⇒ register 명령, 즉 메모리 안의 값을 읽어서 레지스터 안에 넣는 명령
```
    LDA FIVE 

    . 위 명령은 (메모리에 저장된)FIVE 라는 데이터 변수의 값을 읽어서 A 레지스터로 넣는 명령입니다
    . [FIVE] => A (부등호 기호 아님) 
    . 마찬가지로 LDX FIVE 라면 [FIVE] => X
    . (FIVE 는 사용자가 정의해놓은 데이터 변수)
```
- store : register ⇒ memory 명령, 즉 레지스터 안의 값을 읽어서 메모리 안에 넣는 명령
```
    STA HELLO

    . A 레지스터 안의 값을 HELLO 라는 데이터 변수안에 넣는 명령입니다.
    . [HELLO] => A
    . 마찬가지로 STX HELLO 라면 [HELLO] => X
```
### Arithmetic
```
    ADD HELLO
    . [A] + [HELLO] => A

    SUB HELLO
    . [A] - [HELLO] => A

    MUL HELLO
    . [A] * [HELLO] => A 

    DIV
    . [A] / [HELLO] => A
```
### Comparison
```
    COMP HELLO
    . [A] : [HELLO] => SW
    . A 레지스터의 값과 HELLO의 값을 비교하여 SW 레지스터에 저장
```
### JSUB
```
    JSUB MYFUNC

    . 코드를 실행하면 내부적으로 아래와 같이 작동합니다
    . 1. [PC] => L  (돌아올 위치를 백업하기위한 작업)
    . 2. MYFUNC => PC (MYFUNC 라는 서브루틴을 호출하는 작업)
```
### RSUB
```
..서부루틴 내부..
    RSUB

. [L] => PC
. JSUB 에서 백업해뒀던 주소가 L에 있기때문에, 이를 이용하여 돌아가는 명령이라고 보면 됩니다. 
```
### RESW, RESB

변수 선언,정의를 위한 명령

RESW는 Reserve(예약하다) Word(Word 크기)라는 뜻의 명령이다. 즉 WORD 사이즈를 예약하여 변수를 선언하게 할수있다. 
```
HELLO RESW 1
. 1 WORD 만큼을 HELLO에 예약한다. 

CAR RESB 2
. 2 BYTE 만큼을 CAR에 예약한다.  
```
### WORD, BYTE

상수 선언, 정의를 위한 명령
```
FIVE WORD 5
. FIVE 는 5를 값으로 갖는 상수로 지정된다

CHARZ   BYTE    C'Z'
. CHARZ 는 Z 를 값으로 갖는 상수로 지정된다
```