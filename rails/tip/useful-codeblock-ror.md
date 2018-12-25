---
tags: ["rails", "루비", "코드조각"]
---
# Ruby/Rails 코드 조각 모음

## Rails Console에서 테이블 하나 드랍하기

```bash
$ rails console
> ActiveRecord::Migration.drop_table(:table_name)
```

## Rails Console에서 sql파일 실행시키기

```ruby
$ rails console
> ActiveRecord::Base.connection.execute(IO.read(“your_file.sql”))
```

## Rails Console에서 이미지 다운 받기

```ruby
$ rails console # 물론 rails에 종속성은 없다
> require 'open-uri'
> open('image.png', 'wb') do |file|
>  file << open('http://example.com/image.png').read
> end
```

## Rails에 로딩 스피너 적용하기! (feat, turbolinks)


```javascript
/* app/assets/javascripts/application.js */
...
$(document).on('turbolinks:request-start', function () {
    // 요청이 진행중인 상태에 수행할 작업을 작성한다

    // ex)
    // 스피너외의 영역에 loaded라는 클래스를 주었다
    // 스피너 영역을 loading-spinner라는 클래스를 주었다
    $('.loaded').hide(); // 로딩 스피너가 돌아갈때도 굳이 나머지영역을 날리고싶지않다면 hide를 안해도 무방하다.
    $('.loading-spinner').show();
});

$(document).on('turbolinks:request-end', function () {
    // 요청이 완료된 상태에 수행할 작업을 작성한다.

    //ex)
    $('.loaded').show();
    $('.loading-spinner').hide(); // 로딩이 완료됬으므로 스피너를 화면에서 숨긴다.
});
...
```

```html
<!-- application.html.erb -->
...
<div class="your_custom_classes loaded">
<%= yield %>
</div>
...
<div class="loading-spinner">
</div>
```

```css
/* application.css */
...
<!-- spinner css를 작성한다. -->
<!-- 밑에 코드는 스피너 예제이므로 자유롭게 스피너를 새롭게 작성해도 무방하다. -->

.loading-spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 60px;
  width: 60px;
  background: rgba(0,0,0,.0);
  border-radius: 50%;
  border: 3px solid #a51832;
  border-top-color: #a51832;
  border-bottom: 3px solid #a51832;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

## foo[:key] to foo.key

```ruby
foo = { :mykey => "myvalue", :hello => "world" }

foo = JSON.parse(foo.to_json, object_class: OpenStruct)

# foo.hello
# => "world"
```

<TagLinks />

<Disqus />
