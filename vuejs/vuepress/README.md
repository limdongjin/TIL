---
sidebar: auto
title: Tutorial. Vuepress로 기술문서 빠르게 만들어보자!
meta: 
  - name: description
    content: 신상 정적사이트 생성기 Vuepress를 배워보자
  - property: og:title
    content: Tutorial. Vuepress로 기술문서 빠르게 만들어보자!
  - property: og:description
    content:  신상 정적사이트 생성기 Vuepress를 배워보자
  - property: og:url
    content: https://limdongjin.github.io/vuejs/vuepress
  - property: og:image
    content: https://limdongjin.github.io/images/vuepress-logo.png
---
# Tutorial :: Vuepress로 기술문서 빠르게 만들어보자!

:::warning
이 문서는 vuepress 1.0.0.alpha.30버전을 기준으로 작성되었습니다.
:::

:::warning
vuepress가 정식 릴리즈가 될때 이 문서와 내용이 약간 달라질수도있습니다....ㅠ 
그때는 다시 문서를 빠르게 버전업하여 재배포하겠습니다.
:::

## Vuepress는 무엇인가

1. Vuepress는 Vue.js로 개발되어진 정정 사이트 생성기입니다.
2. 기술문서작성을 위해 최적화된 기본테마를 제공해줍니다.
3. Plugin API를 제공해주어서 플러그인을 제작하거나 적용할수있습니다.
4. Theming System을 제공해주어서 Vue.js를 이용하여 Theme를 제작하거나 다른 개발자가 만든 Theme를 적용하기에도 쉽습니다.

::: tip
현재(2018.12) Vuepress는 1.0.0.alpha.30까지 출시되어있습니다. 
:::

:::tip
현재 https://limdongjin.github.io 는 Vuepress의 기본 테마를 기반으로 제작되었습니다.
[limdongjin/TIL](https://github.com/limdongjin/TIL)
:::

## 기본적인 설치 및 빌드

```bash
# global install
yarn global add vuepress@next

# install as a local dependency
yarn add -D vuepress@next

mkdir docs

# 마크다운 파일을 생성한다. 
echo '# Hello VuePress' > docs/README.md
```

package.json
```js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

```bash
# Development Mode
yarn docs:dev

# build to static files
yarn docs:build
```

## Vuepress는 어떻게 Routing이 되는가?

vuepress는 기본적으로 디렉토리 구조와 파일이름으로 url이 routing됩니다.

| Relative Path | Page Routing |
|---|---|
| /README.md | / |
| /guide/README.md | /guide/ |
| /hello.md | /hello.html |
 
## About Configuration

vuepress는 config파일이 없더라도 빌드할수있지만, vuepress가 지원해주는 기능들을 사용하거나 커스터마이징하기위해서는
config파일(또는 폴더)를 생성하는것이 좋습니다.! 

<br />
vuepress는 .vuepress폴더에 설정이나 테마,플러그인등을 작성하게 되어있습니다.
그리고 기본적으로 설정을 config.js 파일에 주로 작성하게됩니다. 

<br />
아래 디렉토리 구조는 vuepress 공식문서에서 추천하는 디렉토리 구조입니다. 
커스터마이징하는 정도에 따라서 아래 디렉토리 구조에서 선택하는 폴더나 파일이 달라집니다.

```
.
├── docs
│   ├── .vuepress (Optional)
│   │   ├── components (Optional)
│   │   ├── theme (Optional)
│   │   │   └── Layout.vue
│   │   ├── public (Optional)
│   │   ├── styles (Optional)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (Optional, Danger Zone)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (Optional)
│   │   └── enhanceApp.js (Optional)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json

```

:::tip
이에대한 더 자세한 내용은 공식문서를 참고해보세요! [Vuepress 디렉토리 구조](https://vuepress.vuejs.org/guide/directory-structure.html)
:::

## 기본적인 설정파일 .vuepress/config.js

주로 docs/.vuepress/config.js에 코드를 많이 작성하게 됩니다.
config.js에 vuepress의 기본적인 설정을 하거나, 플러그인 추가, 사이트 메타정보 설정 등을 하게됩니다. 

<br />
간단히 말하면 .vuepress/config.js는 설정의 중심 파일정도로 생각하면 될것같습니다.

```bash
cd docs

mkdir .vuepress
touch .vuepress/config.js
```

```js
// docs/.vuepress/config.js
module.exports = {
  title: 'VuePress 시작!',
  description: 'Hello World'
}
```

## 기본 Nav Bar 

```bash
# current directory: ~/docs

mkdir about
echo '# About Page' > about/README.md
```

가장 기본적인 Nav Bar는 아래 코드를 통해 구현할수있다. 

```js{6,7,8,9}
// docs/.vuepress/config.js
module.exports = {
  title: 'VuePress 시작!',
  description: 'Hello World',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' }
    ]
  }
}
```

:::tip
navbar, sidebar 등의 테마관련 설정은 themeConfig에 설정하게됩니다.
:::

:::danger
nav,sidebar 라우팅에서 '/about/'이 아닌 '/about'으로 설정할경우에
'/about.md'를 렌더링하게됩니다.
:::

## 드랍다운이 되는 Nav Bar

```bash
# current directory: ~/docs

# 아직 about폴더를 아직 만들지않았다면,
mkdir about

echo '# About ME' > about/me.md

echo '# About Blog' > about/blog.md
```


```js{6,7,8,9,10,11,12,13,14}
// docs/.vuepress/config.js
module.exports = {
  title: 'VuePress 시작!',
  description: 'Hello World',
  themeConfig: {
    nav: [
      {
        text: 'About',
        items: [
           { text: 'About Me', link: '/about/me' },
           { text: 'About Blog', link: '/about/blog' }
        ]
      }
    ]
  }
}
```

:::tip
nav bar에 대한 더 자세한 내용 => [Default theme > Nav Bar](https://vuepress.vuejs.org/theme/default-theme-config.html#navbar)
:::

## 한줄만 작성하고도 빠르게 Sidebar 구현하기

vuepress에는 Sidebar에 대한 다양한 설정법을 제공해주고있는데 여기서 가장 간단한 방법은 markdown파일의 `Front Matter`에 `sidebar: auto`설정을 작성해주는것이다.

``` bash{3}
# current directory: ~/docs

touch foo-nav.md
```

``` markdown{1,2,3}
---
sidebar: auto
---
# 샵하나는 제목으로 자동 설정됩니다. 
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
## 섹션1
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
### 섹션1-1
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
### 섹션1-2
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
## 섹션2
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
## 섹션3
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
```

그다음 /foo-nav.html를 url로 쳐서 접속해보면, #을 기준으로 Sidebar가 생성된것을 볼수있습니다.

:::tip
두 --- 사이의 값을 Front Matter Variable이라하며 Vuepress에서는 이 Front Matter Variable을 이용하여 페이지 설정을 하게된다. 
또한 커스텀 플러그인을 제작하거나 커스텀 테마을 제작하는 등의 커스터마이징을 할때 frontmatter를 활용할수도있다. 
[Frontmatter](https://vuepress.vuejs.org/guide/frontmatter.html)
:::

:::tip
auto로 설정하기에는 sidebar가 복잡할것같은경우에는 공식문서를 참고하자.
[sidebar](https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar)
:::

## SEO를 위해 페이지에 meta 태그를 설정해주기 (predefined frontmatter)

검색엔진최적화(SEO)를 위해서는 페이지의 제목,내용등의 메타정보가 설정되야한다. 
<meta name="title">은 샵하나 내용을 자동으로 추가해주고있지만, 
아직 vuepress는 오픈그래프,description 등의 meta태그를 설정해주고있지않아서 일일이 넣어줘야한다...

(물론 자동으로 페이지의 제목,내용 등을 메타태그에 넣어지도록 해주는 플러그인을 만들수도있을것이다.
 능력자님들이 얼른 seo 플러그인을 만들어주리라 믿습니다...)

```md
---
meta: 
  - name: description
    content: 문서의 description
  - property: og:title
    content: 문서의 title
  - property: og:description
    content: 문서의 description
  - property: og:url
    content: https://mysite.com/hello.html
---
# 제목!
...
## 내용1
...
## 내용2
...
```

## 공통 Head 태그 설정하기

```js{6,7,8,9}
// docs/.vuepress/config.js
module.exports = {
  // ... 
  // themeConfig: { ... }...
  // ...
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }]
  ]
}
```

:::warning
같은 attribute 이름을 가진 태그를 frontmatter에도 추가하고 공통 Head태그에도 추가한경우에는,
html head에는 저 태그들 둘다 추가된다.......ㅠㅠㅠ 
:::

## Public 폴더 

:::danger
"/logo.png"에 접근을 하기위해서는 .vuepress/public 폴더에 logo.png파일을 위치시켜야합니다.
:::

```bash
mkdir .vuepress/public
# move logo.png to .vuepress/public
```

## 쓸만한 플러그인 추가하기1. `back-to-top`

back-to-top 플러그인은 페이지의 가장 위로 올라가게하는 버튼을 제공해준다. 
이 튜토리얼 문서의 5시방향의 ^모양의 버튼이 바로 그것이다. 
<br />

### Install
```bash
yarn add -D @vuepress/plugin-back-to-top@next
# OR npm install -D @vuepress/plugin-back-to-top@next
```

:::warning
package.json에 등록된 플러그인 버전과 vuepress버전을 같게 설정해주세요.
:::

### Usage
```js{5}
// docs/.vuepress/config.js
module.exports = {
  // ...
  // ...
  plugins: ['@vuepress/back-to-top'] 
}
```

:::tip
짧은 페이지에서는 버튼이 나타나지않으며, 일정이상 스크롤이 내려간상태에서 버튼이 표시되는것같습니다.
:::

## 쓸만한 플러그인 추가하기2. pwa

Progressive Web App을 손쉽게 구현해주는 플러그인이다. 
개발자는 manifest.json파일과 144x144 크기의 logo파일만 준비해두면된다.

### Install
```bash
yarn add -D @vuepress/plugin-pwa@next
# OR npm install -D @vuepress/plugin-pwa@next
```
:::warning
package.json에 등록된 플러그인 버전과 vuepress버전을 같게 설정해주세요.
:::

### config파일에 플러그인 등록 

```js
// docs/.vuepress/config.js
module.exports = {
    // ...
    head: [
        ['link', { rel: 'icon', href: `/images/logo-144.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }]
    ],
    plugins: [
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: true
        }]
    ]
}
```

### manifest.json 생성 및 로고 이미지

.vuepress/public/manifest.json을 생성하고 
.vuepress/public/images 폴더에 logo-144.png 이미지를 넣습니다.

```bash
# current directory: ~/docs

touch .vuepress/public/manifest.json
```

```json 
{
  "name": "LimdongjinBlog",
  "short_name": "dongjin",
  "start_url": "/?utm_source=homescreen",
  "icons": [
    {
      "src": "images/logo-144.png",
      "sizes": "144x144",
      "type": "image/png"
    }
  ],
  "theme_color": "#000000",
  "background_color": "#FFFFFF",
  "display": "fullscreen",
  "orientation": "portrait"
}
```

:::tip
manifest설정에 대한 자세한 내용은 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/Manifest)를 확인하세요.
:::

:::tip
pwa 플러그인에대한 자세한 내용은 [vuepress 공식문서](https://vuepress.vuejs.org/plugin/official/plugin-pwa.html#customize-the-ui-of-sw-update-popup)에서 확인하세요.
:::

## 쓸만한 markdown 기본 extension 1. Custom Container

### tip
:::tip
팁 박스!
:::

```md
:::tip
팁 박스!
:::
```
### warning
:::warning
워닝 박스!
:::
```md
:::warning
워닝 박스!
:::
```
### danger
:::danger
danger 박스!
:::
```md
:::danger
danger 박스!
:::
```

:::tip
공식문서 [Custom Containers](https://vuepress.vuejs.org/guide/markdown.html#custom-containers)
:::
## 쓸만한 markdown 기본 extension 2. Line Highlighting in Code Blocks

코드블럭의 앞부분에 {라인번호,라인번호,라인번호}를 추가하여 해당 줄을 강조시킬수있다.

ex) " ```js{3} "형식

:::tip
공식문서 [Line Highlighting in Code Blocks](https://vuepress.vuejs.org/guide/markdown.html#line-highlighting-in-code-blocks)
:::

## 쓸만한 markdown 기본 extension 3. LineNumbers

```js{3,4,5}
// docs/.vuepress/config.js
module.exports = {
  markdown: {
    lineNumbers: true
  }
}
```

## Disqus 댓글 기능 추가하기

이 기능에 대한 설명은 아래 링크로 대체합니다.

[유기체의 다락방](https://62che.com/blog/vuepress/%EB%8C%93%EA%B8%80-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0.html)

:::tip
[소스코드](https://github.com/limdongjin/TIL/blob/master/.vuepress/components/Disqus.vue)
:::


## 유용한 자료 모음

[Vuepress 공식 문서](https://vuepress.vuejs.org/)

[Vuepress Tutorial](https://vuepressbook.com/introduction.html)

[In-Depth VuePress Tutorial: Vue-Powered Docs & Blog posted by Charles Ouellet](https://snipcart.com/blog/vuepress-tutorial-vuejs-documentation)

[Zero to Deploy: Build A Documentation System with Vue and VuePress posted by William Imoh](https://scotch.io/tutorials/zero-to-deploy-build-a-documentation-system-with-vue-and-vuepress)

[Creating a blog with Vuepress posted by Adam Collier](https://medium.com/@adam.collier/creating-a-blog-with-vuepress-44ec0fed9718)

[VuePress in all its glory posted by Nosa Obaseki](https://blog.logrocket.com/vuepress-in-all-its-glory-2f682e4f70c0)

[VuePress Examples 1.3.7](https://vuepress-examples.netlify.com/)

[개인블로그 :: 유기체의 다락방](https://62che.com/blog)

<Disqus />
