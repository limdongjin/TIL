---
description: SIC(Simplified Instructional Computer)의 구조, 데이터 포맷, 레지스터, instruction format, Addressing 에 대해 알아보자
tags: ["시스템프로그래밍"]
---
# [SP-2] SIC의 구조 (memory, reg, data format, ..)

## Memory (SIC)

- 1 byte  : 8 bits
- 1 word : 3 bytes = 24 bits
- All addresses are byte addresses
- 메모리는 총 2의 15승 byte

## Registers (SIC)

SIC 는 special purpose 레지스터를 5개 갖고 있으며, 각각 1 word (24 bits) 이다. 

| Mnemonic | Number | 목적 |

| :--------: |:--------:| :--------:|

| A | 0 | Accumulator : 산술 연산에 활용 |

| X | 1 | Index register : Addressing 할때 사용, 주소 저장 및 계산 |

| L | 2 | Linkage register: JSUB (Jump to Subroutine)할때 return address가 이 레지스터에 저장됨 |

| PC | 8 | Program Counter | 

| SW | 9 | Status Word | 

## Data Format (SIC)

SIC 에서는 두가지의 데이터 포맷을 지원한다. floating-point number는 SIC에서는 지원하지 않고, SIC/XE 에서 지원합니다

- Integer : 24 bits binary numbers
- Character : 8 bits ASCII code

## Instruction Format , Addressing (SIC)

- SIC 의 Instruction Format 길이는 1 word(24 bits) 입니다.
- ( SIC/XE 에서는 Instruction Format이 몇가지 추가됩니다 )

![](/images/sic-instruction-format.png)

- Instruction Format
    - OP Code : 8 bits
    - X : 1 bit 를 차지한다. Addressing Mode 를 결정함.
    - Address : 15 bits

- Addressing
    - Direct Addressing: if X == 0, Target Address(TA) = Address
    - Index Addressing: if X == 1, TA = Address + [X]
    - (* [X]는 X 레지스터 안의 값을 나타냅니다)