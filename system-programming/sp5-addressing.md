---
description: SIC/XE의 Addressing Mode 에 대해 알아보자(PC relative, Base, simple, indirect..)
tags: ["시스템프로그래밍"]
---
# [SP-5] SIC/XE 의 Addressing Mode (PC relative, Base, simple, ..)

이 글은 독자가 SIC/XE의 Instruction Format 을 이해했다는 전제하에 작성 되었습니다. SIC/XE의 Instruction Format 에 대한 내용은 [이전 글](/system-programming/sp4-sicxe-structure) 에서 확인 가능 합니다. 

## standard SIC instruction

n == 0 이고 i == 0 이면 SIC의 Instruction Format 으로 간주된다. 

**즉 b, p, e bits는 flag 로 간주하는 것이 아니라, SIC Instruction Format의 Address 의 일부분이라고 생각해야함. 놓치기 좋을만한 예외상황이므로 잘 기억하고있어야한다.**

![](/images/sic-standard-inst.png)

## Target Address(TA) 계산을 위한 Mode

- Base Relative
    - **b == 1, p == 0** 일때 Base Relative
    - TA = disp + [B]
    - disp 을 12bit **unsigned** integer 로 해석 (disp: 0 ~ 4095)

- PC Relative
    - **b == 0, p == 1** 일때 PC Relative
    - TA = disp + [PC]
    - disp 을 12bit **signed** integer 로 해석 (disp: -2048 ~ 2047)

- Direct Addressing
    - **b == 0, p == 0** 일때
    - TA = disp

(b 가 base 의 앞글자, p가 pc의 앞글자임을 생각하면, base, pc addressing의 조건을 바로 외울수있다. )

(주의,  b == 1 이면서 동시에 p == 1 인 경우는 에러 케이스라고 간주합니다.)

(앞서 말했듯이, standard sic instruction의 조건에 만족하는 경우에는 b, p field는 Addressing Mode 결정을 위해서 쓰이지않습니다. )

- Index Addressing
    - **x == 1** 일때
    - TA = disp + [X]
    - **주의. 다른 Addressing Mode 와 결합 할 수 있다**
    - **ex) if b == 1, p == 0,  x == 1, TA = disp + [B] + [X]**

## TA 해석을 위한 Mode

### Simple, Immediate, Indirect

- Simple Addressing
    - **n == 1, i == 1** 일때
    - TA(Target Address)로 메모리에 접근해서 값을 가져옴
    - 예를들어, TA 가 0x123 이고 메모리 0x123 번지에는 0x030이라는 값이 들어있다면, 0x123을 사용하는 것임.

- Immediate Addressing
    - **n == 0, i == 1** 일때
    - 메모리 reference 안함.
    - disp, address field 의 값을 주소 값으로 생각 안하고 그 자체를 값으로 생각함.
    - 예를들어 disp 이 0x100 이라면, 0x100 번지의 값을 쓰는 것이 아니라, 0x100 이라는 값 그 자체를 사용하는 것임.

- Indirect Addressing
    - **n == 1, i == 0** 일때
    - TA 를 간접 주소로 해석한다.
    - 포인터의 동작 방식을 생각하면 이해하기 쉽다.

### Simple Addressing 추가 설명

![](/images/sicxe-simple-addressing.png)

### Indirect Addressing 추가 설명

![](/images/sicxe-indirect.png)

    // indirect Addressing 의 이해를 위한 c 언어 예제
    
    int a = 10;
    int* ptr = a; // 포인터 변수 ptr 에는 a 변수의 주소가 저장된다. 
    
    printf("%d", *ptr); // 출력: 10
    
    // 10 이라는 값이 출력되기까지의 과정을 알고있다면 Indirect Addressing 을 알고있다고 볼수있다.
    
    // 1. 포인터 변수 ptr 에 저장된 값을 불러온다. 이는 a 변수의 주소 값이다
    // 2. a 변수의 주소값을 통해 a 변수로 접근
    // 3. a 변수에 저장된 값인 10을 불러온다. 
    // 4. 10을 출력한다.

    // indirect Addressing 을 위한 예시
    
    disp = 0x123 
    메모리 0x123 번지에 저장된 내용 = 0x200
    메모리 0x200 번지에 저장된 내용 = 0x300
    
    일때 indirect addressing 을 한다면?
    
    1. 메모리 0x123 번지에 저장된 값을 불러온다. 이는 0x200 이다
    2. 0x200번지에 저장된 값을 불러온다. 이는 0x300 이다

## Assembly 코드 레벨에서 Indirect, Immediate 구분

    	J @RETADR 
    . @ 가 붙으면 Indirect Addressing
    
    	COMP #1
    . # 이 붙으면 Immediate Addressing