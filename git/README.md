---
prev: /
title: 최강의 협업도구 GIT / Github
meta: 
  - name: description
    content: 최강의 협업도구 GIT / Github에 대해 알아보자! 
  - property: og:title
    content: 최강의 협업도구 GIT / GITHUB 
  - property: og:description
    content: 최강의 협업도구 GIT / Github에 대해 알아보자 
  - property: og:url
    content: https://limdongjin.github.io/git
---
# `git/github`

효율적인 협업과 버전관리를 위해서 주로 git을 사용한다 

## Quick start

```shell
git init 
touch README.md 
# 파일이 하나 이상 존재해야하므로 README.md 파일을 만들었다

git config --global user.name "여기에 이름을 적으세요" 
git config --global user.email "여기에 이메일을 적으세요"  
```

```shell
git add . # 모든 파일을 새로 생성할 예정인 버전에 add함 
# 또는 
git add 파일이름 # ex) git add README.md

git commit -m "커밋 메세지" 
# commit으로 버전을 생성하는 것이라고 보면 됨. 

git push -u origin master
# github와 같은 원격저장소에 master 브랜치로 업로드
```

## Useful Command

```shell
git log 
# 저장소(레포지토리)에 커밋된 버전들을 확인할수있다

git diff 
# 가장 최근에 커밋된 버전사이의 변경사항을 확인할수있다

git branch --list
# 브랜치 목록과 현재 브랜치를 확인 가능

git branch 생성할브랜치이름
# 브랜치를 생성할수있다. 
# ex) git branch itisbranch

git checkout 브랜치이름
# 해당 브랜치로 이동할수있다. 
# ex) git branch itisbranch 
# 해당 예시 명령을 실행하면 itisbranch 브랜치로 이동된다.

```

## Useful Reference

[git-scm 문서](https://git-scm.com/book/ko/v2/%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-%EB%B2%84%EC%A0%84-%EA%B4%80%EB%A6%AC%EB%9E%80%3F)

[초심자를 위한 깃허브 협업 튜토리얼](https://milooy.wordpress.com/2017/06/21/working-together-with-github-tutorial/)

[완전 초보를 위한 깃허브](https://nolboo.kim/blog/2013/10/06/github-for-beginner/)

[깃허브 민감한 데이터 제거하기](http://minsone.github.io/git/github-advanced-remove-sensitive-data)

[깃 간편 안내서](https://rogerdudler.github.io/git-guide/index.ko.html)

[깃 팁모음](https://github.com/mingrammer/git-tips)

[Markdown 간단하게 정리하기](http://blog.eomdev.com/github/2015/12/11/github-markdown.html])

<Disqus />
