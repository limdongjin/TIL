---
prev: /nodejs_serverside/Sequelize/
---
# Migration in Sequelize

## Create Model & table

```bash
$ sequelize model:generate --name Post --attributes title:string,content:text,category:text
$ sequelize db:migrate
```

## Add Column
해당 command를 입력하면 아래와 같은 파일이 생기는 것을 볼수있다.
```bash
$ sequelize migration:create --name add_column_to_table 
```
migrations/#@!!@-add_column_to_table.js
```js
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      
      /* 
      주석
      */
  },

  down: (queryInterface, Sequelize) => {
    
      /*
      주석
      */
  }
};

```
만약 'Posts' 테이블에 'like'라는 INTEGER 타입의 칼럼을 추가하고 싶다면, 해당 migration 파일을 다음과
같이 수정하고 migrate하면 된다.
```
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
          'Posts',
          'like',
          Sequelize.INTEGER
        );  
  },

  down: (queryInterface, Sequelize) => {
 
  }
};
```
