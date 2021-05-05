---
description: C 코드 조각. 실행 파일이 위치한 폴더에 있는 파일들과 폴더들을 출력한다
tags: ["C/CPP", "코드조각", "팁"]
---
# C 코드 조각. print_dir

```c
#include <stdio.h>
#include <dirent.h>
#include <sys/stat.h>
#include <stdbool.h>
#include <unistd.h>
#include <string.h>

/*
 * 실행 파일이 위치한 폴더에 있는 파일들과 폴더들을 출력한다.
 */
bool print_dir(){
    DIR* dir = opendir(".");
    struct dirent *ent;
    struct stat stat;
    char* ent_dname;
    char* format;
    char path[1025];
    int i = 0;

    if(!dir){
        fprintf(stderr, "[ERROR] Can't open directory");
        return false;
    }
    ent = readdir(dir);
    while (ent){
        ent_dname = ent->d_name;
        lstat(ent_dname, &stat);

        if(S_ISDIR(stat.st_mode)) format = "%s/";
        else if(S_IXUSR & stat.st_mode) format = "%s*";
        else format = "%s ";

        sprintf(path, format, ent->d_name);
        printf("%-20s", path);

        if(++i % 5 == 0) printf("\n");
        ent = readdir(dir);
    }
    if (i % 5 != 0) printf ("\n");
    closedir(dir);
    return true;
}
```
