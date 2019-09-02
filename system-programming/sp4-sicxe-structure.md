---
description: SIC/XE 의 구조(메모리, 데이터 포맷, 레지스터, instruction format, ...)에 대해 알아보자
tags: ["시스템프로그래밍"]
---
# [SP-4] SIC/XE 의 구조 (memory, reg, data format, ..)

SIC/XE는 SIC 의 업그레이드 버전입니다. 정확히 말하면 SIC에 feature 몇가지가 추가된 버전입니다. 

SIC 의 기존 feature 들은 모두 SIC/XE 에서도 호환이 됩니다. (upper compatibility)

<br>

그렇기 때문에 이 글에서는 SIC/XE 에 추가된 feature 만을 언급하고 있습니다. 

## Memory (SIC/XE)

- 총 메모리 크기는 1MB (2의 20승)

## Registers (SIC/XE)

4개의 레지스터가 추가되어 SIC/XE는 총 9개의 레지스터를 갖습니다. 

F 레지스터는 2 word (48 bits) 이며, 나머지 레지스터들은 각각 1 word (24 bits) 입니다.

 

| Mnemonic | Number | 목적 |
|:--------|:--------:|--------:|
| B | 3 | Base register : Addressing 할때 사용|
| S | 4 | General working register |
| T | 5 | General working register |
| F | 6 | Floating Point Accumulator | 

## Data Format (SIC/XE)

48 bit 부동 소수점(floating point) 데이터 포맷이 추가 되었습니다. 

아래와 같은 포맷을 갖습니다.

![](/images/sicxe-float.png)

- Float
    - S : 1 bit
    - Exponent : 11 bit
    - Fraction : 36 bit

- 0 ≤ Fraction ≤ 1
- 0 ≤ Exponent ≤ 2047
- if S == 0, positive
- if S == 1, negative

## Instruction Format (SIC/XE)

SIC/XE 에서는 4가지 Instruction Format 을 제공합니다. 

- format 1
    - 총 1 byte
    - OpCode(8bit)
    - 메모리에 reference 하지 않음

- format 2
    - 총 2 byte
    - OpCode(8bit), reg1(4bit), reg2(4bit)
    - (reg1 을 r1 이라고 줄여 말하기도 한다. reg2는 r2로)

- format 3
    - 총 3 byte
    - OpCode(6bit), n,i,x,b,p,e (각각 1bit 씩), disp (12bit)
    - n, i, x, b, p, e 는 flag bits 의 역할을 한다고 보면 된다.
    - e 가 0 이면 format 3 이다. e 가 extend 여부를 결정하는 flag 라고 생각 하면 된다

- formt 4
    - 총 4 byte
    - OpCode(6bit), n,i,x,b,p,e (각각 1bit 씩), address (20bit)
    - e 가 1 이면 format 4 이다.

참고로 flag bits 중에 x 는 SIC 에도 있던 flag bit 인데, SIC 와 마찬가지로 SIC/XE 에서도 x == 1 이면 Index Addressing 이다. 하지만 SIC 에서는 x == 0 인 경우에는 반드시 Direct Addressing 이었는데, SIC/XE 에서는 x == 0 이더라도, 다른 flag bit 에 따라서 Addressing Mode 가 결정된다. 

또한 SIC/XE에서는 Direct, Index Addressing 이외에도 몇가지 Addressing Mode 가 추가되었으며, 이에 대한 내용은 다음 글에서 다루도록 한다.

![](/images/sicxe-formats.png)