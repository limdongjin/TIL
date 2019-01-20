---
description: html.erb에서 쓰는경우에, html 문자열이 그대로 출력되는게 아니라. 화면에 그려질수있게하기.
tags: ["rails", "코드조각", "팁"]
---
# 코드조각. html형식의 string 변수를 View에 그려주기

```ruby
@html_data = "<h1> Hi. <p> hello</p> </h1>"
```

@html_data 와 같은 루비 변수가 있을때
이를 html.erb 에서 단순히 `<%= @html_data %>`로
쓰게되면 html태그가 그대로 출력되게된다. 이를 해결하기위해서는

```ruby
<%= @html_data.html_safe %>
```

`.html_safe` 를 써주면 해결할수있다!!
