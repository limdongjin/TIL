---
prev: /nodejs_serverside/
---
# Sequelize 

## What is Sequelize?
Sequelize는 Node.js의 ORM중 하나이며, SQL계열의 DBMS를 지원하는 ORM이다. 


또한 개인적으로 보기에 Sequelize는 Mongoose와 사용법이 비슷하다. 

## Installation ( Mysql )
1. Sequelize의 기본적인 설치는 다음과 같다. 
```bash
$ npm install --save sequelize
$ npm install --save mysql2
$ npm install --save mysql
```

2. Sequelize는 CLI를 제공한다. CLI도 설치하자! 
```bash
$ npm install -g sequelize-cli
```

3. DB의 기존 테이블을 편하게 연동하기 위해 도와주는 도구인 sequelize-auto도 설치한다
```bash
$ npm install -g sequelize-auto
```

## Sequelize 시작하기 !! 
1. sequelize 초기 설정
```bash
$ sequelize init:config --config config/sequelize.json
$ sequelize init:models
```
해당 명령어들을 입력하면,  다음과 같은 파일들이 생긴 것을 볼수있다. 
```bash 
├── config/
  └── sequelize.json
├── models/
  └── index.js
```
- sequelize.json은 데이터베이스 정보를 설정하는 파일이다.( 민감한 정보가 github 등에 push되지 않도록 조심하자  )

2. 기존 테이블과 연동하여 모델 생성

해당 커맨드를 입력하면 기존 데이터베이스에 있는 테이블들에 해당하는 Model 파일들을 만들어준다. 
```bash 
$ sequelize-auto -o "./models" -d dbname -h hostname -u username -p 3306 -x password -e mysql
```
 
## Sequelize Example 
 ```js
 const models = require('./../models');
 
 models.User.findAll()
   .then(results) {
      res.json(results);
   })
   .catch(err => {
      console.error(err);
   });
```

## Create Migration & Create Model

[바로가기](/nodejs-serverside/sequelize/migration/)

## C(create)

[바로가기](/nodejs-serverside/sequelize/crud/c/)

## R(read)

[바로가기](/nodejs-serverside/sequelize/crud/r/)
