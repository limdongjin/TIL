---
title: 뷰프레스 Disqus 댓글 기능 구현하기 + layout 확장하기
meta:
 - name: description
   content: 뷰프레스에 댓글 기능을 추가해보고 점진적으로 기능을 개선해본다.
 - property: og:image
   content: https://limdongjin.github.io/images/vuepress-logo.png
tags: ["vue", "vuepress", "튜토리얼"]
---
# 뷰프레스 Disqus 댓글 기능 구현하기 + layout 확장하기

## 목차

[[toc]]

## 페이지에 Vue Component 추가하기

페이지에 Vue Component 를 추가하는 것은 매우 직관적이고 쉽습니다.

1. .vuepress/component 폴더가 없다면 폴더를 만들어줍니다.
2. .vuepress/component 폴더안에 Vue Component 를 작성해줍니다.
3. Component 를 추가하고싶은 페이지(md파일)의 적절한 위치에 "\<MyComponent />" 와 같은 방식으로 추가하면 됩니다.

```vue
// .vuepress/component/HelloWorld.vue
<template>
    <div>
        <h1> Hello World</h1>
    </div>
</template>
```

```markdown{5}
// mypage.md
# Mypage
...
...
<HelloWorld />
```

:::tip
Component에서 frontmatter를 접속할려는 경우에는 this.frontmatter.title 과 같이 접근할수있습니다.
:::

## Disqus 댓글 기능을 Component로 구현해보자!

### 구현

바로 앞에서는 Component 를 페이지에 추가하는 방법에 대해 배웠습니다.

이를 응용하여 Disqus라는 댓글서비스를 불러오는 Component 를 구현할수있습니다.

```vue
// .vuepress/components/Disqus.vue
<template>
    <div id="disqus_thread"></div>
</template>

<script>
    export default {
        mounted() {
                console.log("Hello!")
                try {
                    let disqus_config = function () {
                        this.page.url = location.origin;
                        this.page.identifier = location.pathname;
                    };
                    (function () {
                        let d = document, s = d.createElement('script');
                        s.src = 'https://limdongjin.disqus.com/embed.js';
                        s.setAttribute('data-timestamp', +new Date());
                        (d.head || d.body).appendChild(s);
                    })();
                } catch (e) {
                    // some error
                }
        }
    }
</script>
```

```markdown
// mypage.md
...
...

<Disqus />
```

### 문제점

댓글이 필요한 페이지마다 Component 를 일일이 추가해줘야한다.

만약 페이지가 1000개라면 1000개의 페이지 파일(마크다운 파일)에 Component를 일일이 적어줘야한다.

실수하기에도 쉽고 유지보수하기에도 어려워진다.

## Disqus 댓글 Component가 자동으로 등록되게해보자! - 기본 Layout 확장

Theme의 Layout에 Disqus Component를 끼워넣으면 된다!

Vuepress는 테마를 새로 작성하지않더라도 기본 Layout을 확장할수있도록 지원해준다.

slot을 이용하여 원하는 위치에 Component 를 추가할수있다. 참고로 page-bottom이라는 slot은 기본적으로 있는 slot인것같다.

또한 v-if에 걸어준 조건은 자유롭게 설정해주면 된다.
아래 코드에서는 disqus라는 frontmatter가 존재할때만 Disqus 컴퍼넌트를 불러오게 구현하였는데, url 등의 다른 조건들로 설정하여도 무방하다.

모든 페이지에 Disqus 댓글을 불러오고싶다면 v-if를 굳이 안써도 무방하긴하다.

```js
// .vuepress/theme/index.js
// .vuepress/theme 폴더를 만들어주자.
module.exports = {
    extend: '@vuepress/theme-default'
}
```

```vue
// .vuepress/theme/Layout.vue
<template>
    <ParentLayout >
        <Disqus slot="page-bottom" v-if="this.$frontmatter.disqus" class="content"/>
    </ParentLayout>
</template>

<script>
    import ParentLayout from '@parent-theme/layouts/Layout.vue'
    import Disqus from '../components/Disqus'
    export default {
        components: {
            ParentLayout,
            Disqus
        }
    }
</script>
```

## References

[(Official)Vuepress Option API](https://vuepress.vuejs.org/theme/option-api.html#plugins)

[(Official)Extend Example Source Code](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/theme-vue/layouts/Layout.vue)

[유기체의 다락방 :: 댓글 시스템 연동하기](https://62che.com/blog/vuepress/%EB%8C%93%EA%B8%80-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0.html)
