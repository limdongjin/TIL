## 이미지 렌더링 팁

### 이미지 렌더링 관련 유용한 라이브러리 

[vue-progressive-image](https://github.com/MatteoGabriele/vue-progressive-image)
 이 라이브러리는 star수가 390개로 다소 적지만, 꽤 쓸만하다. 

 [vue-lazyload](https://github.com/hilongjw/vue-lazyload)

### vue-progressive-image + spinner

이미지가 렌더링 되기전에 spinner를 돌릴수있다.

```html
<progressive-img:src="post.url">
    <div slot-scope="{ visible }" v-if="visible">
        <atom-spinner
            :animation-duration="1000"
            :size="60"
            :color="'#ff1d5e'"/>
    </div>
</progressive-img>
```