---
description: 입력 문자열이 16 진수 인지 확인 - C 
tags: ["C/CPP", "코드조각", "팁"]
---
# C 코드 조각. is_valid_hex

```c
#include <stdlib.h>
#include <assert.h>
#include <stdio.h>
#include <stdbool.h>
#include <string.h>

/*
 * 입력 문자열 str 이 16 진수인지 확인한다.
 * ex, is_valid_hex("00F1") => return true
 * ex2, is_valid_hex("FZ") => return false
 */
bool is_valid_hex(char* str){
    assert(str);
    int l = (int)strlen(str), i;
    for(i=0;i<l;i++) {
        if ('0' <= str[i] &&
            str[i] <= '9')
            continue;
        if('A' <= str[i] &&
           str[i] <= 'F')
            continue;
        if('a' <= str[i] &&
           str[i] <= 'f')
            continue;
        return false;
    }
    return true;
}
```
