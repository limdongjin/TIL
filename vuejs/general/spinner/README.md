
# Vue.js에 Spinner 적용하기

## Vue.js Spinner 라이브러리

[epic-spinners](https://github.com/epicmaxco/epic-spinners)

[vue-spinner](https://github.com/greyby/vue-spinner)

## Spinner를 어떻게 적용하는가? - 1

```html
<template>
    <div v-if="loading">
        I am Loaded
    </div>
    <div v-else>
        <mymyspinner/> <!-- spinner 라이브러리 설치법/사용법은 해당 문서에서 다루지않는다-->
    </div>
</template>
...

data() {
  return {
      loading: true
  }
}
```

## Spinner를 어떻게 적용하는가? - 2

준비중
