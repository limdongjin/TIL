
# Axios로 form submit ajax request 보내기

```
// main.js 

...
import VueAxios from 'vue-axios'
import axios from 'axios'
...
Vue.use(VueAxios, axios)
...
```

{ ... }을 qs.stringify()로 감싸야만, 서버에 올바른 형식의 json 형태로 데이터가 전달된다. 저거 몰라서 처음에 얼마나 많은 시간을 날렸는지 ㅠㅠ....

```
// PostNew.vue

...
const baseURI = `http://localhost:3000`
var qs = require('qs')

this.axios.post(`${baseURI}/posts`, 
    qs.stringify({
        title: this.title,
        content: this.content,
        category: this.category
    }), 
    {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then((result) => {
            console.log(result)
            this.$router.push({name: 'NextRouting'})
          })
          .catch((e) => { console.log(e) })

...

```
