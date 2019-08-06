---
description: "C 코드 조각. hash function"
tags: ["C/CPP", "코드조각", "팁"]
---
# C 코드 조각. hash_string

```c
#include <stdlib.h>
#include <assert.h>
#include <stdio.h>
#include <stdbool.h>
#include <string.h>

/*
 * hashtable 구현을 위한 hash function
 */
size_t hash_string (char *str, int hash_size){
    int32_t hash = 2829;
    int32_t c;
    size_t res;
    while((c = *str++)){
        hash = (hash * 615) + c;
    }
    res = (size_t)hash % hash_size;
    return res;
}
```