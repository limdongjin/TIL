---
description: vuepress의 플러그인을 만들어보자
image: https://limdongjin.github.io/images/vuepress-logo.png
tags: [ "vue", "vuepress" ]
---
# Vuepress 플러그인 만들어보자 !!

## 플러그인 시스템이 vuepress 1.x 버전의 꽃이다.

Vuepress 0.x와 Vuepress 1.x의 가장 결정적인 차이는
Plugin 시스템이 있는지 없는지이다.
1.x 버전은 아직 stable release도 아니고 beta release도 아니고
아직 alpha 단계이다. 그럼에도 stable 버전인 0.x를 안쓰고 1.x를 쓰는 이유는 간단하다.

1.x버전에는 미리 구현되있는 공식 `플러그인`도 꽤 있고, vuepress 내에서 동작하는 플러그인을 만들수있게 해주는 [`Plugin API`](https://vuepress.vuejs.org/plugin/)도 지원해주기때문에 넘사벽이라고 본다.

물론 아직은 공식 플러그인들이 완벽하지는 않다.
@vuepress/blog 플러그인이나 @vuepress/pagination 플러그인은 문서에 사용법에 대한 설명이 빈약해서 아직 사용하기 힘들것이다.
그외에 @vuepress/pwa , google-analytics, medium-zoom, back-to-top 플러그인은 사용할만하다.

:::tip
[Design Concepts of VuePress 1.x](https://vuepress.vuejs.org/miscellaneous/design-concepts.html)
:::

## vuepress에 플러그인 적용하는법

### npm 패키지로 등록된 플러그인

```js
// .vuepress/config.js
module.exports = {
  plugins: [ '@limdongjin/vuepress-plugin-simple-seo' ]
}
```

### 로컬에서 작성한 플러그인

```js
// .vuepress/config.js
module.exports = {
    plugins: [ require('./plugins/myplugin') ]
}
```

### 플러그인에 Option값 넣어서 적용

로컬의 경우에도 비슷한 형식.

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    ['@limdongjin/vuepress-plugin-simple-seo', {
       option1: 'hello',
       option2: 'world',
       ...
    }]
  ]
}
```

## 플러그인의 기본 형태

```js
// myplugin/index.js
module.exports = {
   // ...
}
```

```js
// myplugin2/index.js
module.exports = (options, ctx) => {
   return {
      // ...
   }
}
```

## Option API

Plugin API에서는 Option API와 Context API를 제공해주는데,
많이 쓰게될것은 Option API가 될것이다. 이 문서에서는 Option API의 몇가지 함수만을 소개한다.

### extendPageData

이 함수는 컴파일 타임에 각 페이지마다 실행이 되게된다.
frontmatter 값을 자동으로 추가하는 등의 페이지 커스터마이징을 할때 유용하다.

```js
module.exports = {
    extendPageData ($page) {
        const {
          _filePath,           // file's absolute path
          _computed,           // access the client global computed mixins at build time, e.g _computed.$localePath.
          _content,            // file's raw content string
          _strippedContent,    // file's content string without frontmatter
          key,                 // page's unique hash key
          frontmatter,         // page's frontmatter object
          regularPath,         // current page's default link (follow the file hierarchy)
          path,                // current page's real link (use regularPath when permalink does not exist)
        } = $page

        // plugin을 적용할때 사용자가 옵션으로 입력하는 값을 불러올수있음.
        const default_image = options.default_image

        // seo를 위해 meta 태그를 추가하는 등의 작업도 할수있음.
        frontmatter.title = "hello world!!"
        frontmatter.meta = [{'name': 'description', 'content': 'hi hi'}]
        frontmatter.meta.push({'property': 'og:title', 'content': 'title test'})
    }
}
```

### globalUIComponents

모든 페이지에 적용되는 global Vue 컴퍼넌트를 적용할수있게해준다.

```js
module.exports = {
  globalUIComponents: [
    'mycomponent'
  ]
}
```

### extendMarkdown

마크다운 시스템 수정이나 외부 마크다운 플러그인 적용할수있게 도와줌

### enhanceAppFiles

[App Level Enhancements](https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements)를 할수있게해주는 함수이다.

Vuepress 홈페이지의 FAQ에 의하면 클라이언트 사이드에서 코드를 자동으로 실행하고싶을때 사용한다고한다.

:::tip
이 문서에서 다룬 함수들의 더 자세한 사용법은 공식문서를 확인하면 도움이 많이 될것이다..!!
또한 official plugin들의 구현코드를 읽어보는것도 감을 잡는데에 도움이 될것이다!
:::

## References

[vuepress 공식 문서](https://vuepress.vuejs.org/plugin/)
