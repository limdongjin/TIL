---
description: vuepress의 사이드바에 들어갈 항목들을 자동으로 만들어낸다.
title:
---
# vuepress 사이드바 항목 추가 자동화하기

## 기존의 방법

기존에는 사이드바에 들어갈 항목들을 수작업으로 넣어주었다. 이 방법은 실수할 여지가 많아지고, 단순 반복작업이므로 집중력이 흐트려질 여지가 존재한다.
그래서 이 방법을 개선해보기로하였다.

```js
module.exports = {
    themeConfig: {
        sidebar: [
            {
                title: 'Vuepress',
                collapsable: true,
                children: [
                    '/vuejs/vuepress/',
                    '/vuejs/vuepress/layout-extend',
                    '/vuejs/vuepress/plugin-writing'
                ]
            }
        ]
    }
}
```

## 개선한 방법

파일 구조를 읽어서 자동으로 만들어주면 될것같다!!

결국은 파일 구조를 읽으는것으로 문제를 단순화할수있었고, 구현하면서 주의할점은 크게 네가지정도였다

1. 확장자명을 제거해야한다. 왜냐하면 vuepress의 routing/sidebar 작성 규칙을 따라야하므로.
2. README.md의 경우에는 ''로 대체해야한다. vuepress는 README.md를 ''로 바꿔서 렌더링 하므로.
3. __dirname이 `/Users/imdongjin/workspace/TIL/.vuepress`과 같은 형태이다. (.vuepress/config.js에서 코드가 실행되므로)
4. 제외해야할 키워드가 있는경우도 처리해줘야한다. ( 이부분은 구현은 해놓긴하였지만, 설계적인 측면에서 많이 부족해서 개선이 필요하다. )

```js
// .vuepress/dong_util.js
var dirTree = require('directory-tree')
var path = require('path')

let util = module.exports = {
    getFiles: (name)=>{
        var files = []
        dirTree(path.join(__dirname, '../'+name), {extensions:/\.md/}, (item, PATH) => files.push(item));
        return files
    },
    getArticles: (name, except)=>{
        let articles = []
        var root_dirname = path.join(__dirname, '../')
        var files = util.getFiles(name)
        files.forEach((item)=>{
            if(except !== undefined && item.path.includes(except)) return
            articles.push(item.path.replace(root_dirname, '/').replace('.md', '').replace('README', ''));
        })
        return articles
    }
}
```

```js
// .vuepress/config.js
var path = require('path')
let {getArticles} = require(path.resolve('.vuepress/dong_util'))

module.exports = {
    themeConfig: {
        sidebar: [
            {
                title: 'Vuepress',
                collapsable: true,
                children: getArticles('vuejs/vuepress')
            }
        ]
    }
}
```

## 생각 / 개선점

### 코드 퀄리티 높여야겠다.

아직은 자바스크립트로 작성하는 코드 퀄리티가 많이 부족한것같다. vuepress의 내부코드를 읽어보면 감탄이 나오면서 배울점이 많은것같다.
차근차근 코드퀄리티 높여봐야지..
