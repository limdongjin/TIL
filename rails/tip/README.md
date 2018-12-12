## Ruby/Rails 팁 모음

### 테이블 하나 드랍하기

```bash
$ rails console
> ActiveRecord::Migration.drop_table(:table_name)
```

### rails console에서 sql파일 실행시키기

```ruby
$ rails console
> ActiveRecord::Base.connection.execute(IO.read(“your_file.sql”))
```

### rails console에서 이미지 다운 받기

```ruby
$ rails console # 물론 rails에 종속성은 없다
> require 'open-uri'
> open('image.png', 'wb') do |file|
>  file << open('http://example.com/image.png').read
> end
```

### rails에 로딩 스피너 적용하기! (feat, turbolinks)


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

### foo[:key] to foo.key

```ruby
foo = { :mykey => "myvalue", :hello => "world" }

foo = JSON.parse(foo.to_json, object_class: OpenStruct)

# foo.hello 
# => "world"
```


## 사용해본 유용한 rails 젬 모음 

1. devise : 회원인증 기능 구현을 도와주는 젬 ( 소셜로그인, 토큰인증 등의 부가적인 기능도 구현할수있도록 도와준다. 문서화가 정말 잘되어있다) 
2. carrierwave : 파일 업로드 젬 ( 해당 젬을 사용하면 S3로의 업로드도 쉽게 구현가능하다. )
3. mailgun_rails : 메일건이라는 메일 전송 서비스를 레일즈에 쉽게 연동하도록 도와주는 젬
4. activeadmin : Admin 페이지 구현 젬 (유사한 젬으로 rails_db도 있지만 커스터마이징의 수월함이나 젬의 완성도는 activeadmin이 훨씬 높다고 생각한다.)

+ 저 레포지토리에는 유용한 젬들이 정리되어있다. [awesome-rails-gem](https://github.com/hothero/awesome-rails-gem)
+ 이 링크의 글은 RubyGarage라는 회사에서 자주사용하는 젬들을 적어놓은 글이다. [57 Best Ruby Gems We Use at RubyGarage](https://rubygarage.org/blog/best-ruby-gems-we-use)

## Rails 관련 좋은 글들

[MVC 프레임워크의 문제점 posted by Bluesh](https://bluesh55.github.io/2016/11/26/rails-mvc/)

[(번역)액티브레코드 모델을 리팩토링하는 7가지 방법 translated by Bluesh](https://bluesh55.github.io/2016/09/28/refactor-fat-active-record-model/)

[7 Patterns to Refactor Fat ActiveRecord Models posted by Bryan Helmkamp](https://codeclimate.com/blog/7-ways-to-decompose-fat-activerecord-models/)

[CAOS #1 Rails 기반 환경 구성 posted by Yonghwan SO](http://www.sauru.so/blog/rails-env-especially-for-caos/)

[CAOS #3 Rails Application의 성능 분석 posted by Yonghwan SO](http://www.sauru.so/blog/rails-application-performance/)

[Your Guide to testing in Ruby on Rails 5 posted by Rob Race](https://hackernoon.com/your-guide-to-testing-in-ruby-on-rails-5-c8bd122e38ad)

[Rails에서 carrierwave를 이용하여 AWS S3에 이미지 올리기 posted by hcn1519](https://hcn1519.github.io/articles/2016-02/carrierwave)

[The Beginner's Guide to Rails Helpers posted by Cezar Halmagean](https://mixandgo.com/learn/the-beginners-guide-to-rails-helpers)

[How to Interview Your Ruby on Rails Developer posted by RubyGarage](https://rubygarage.org/blog/how-to-interview-your-ruby-on-rails-developer)

[Ruby on Rails Web Application Vulnerabilities: How to Make Your App Secure posted by RubyGarage](https://rubygarage.org/blog/ruby-on-rails-web-application-vulnerabilities-how-to-make-your-app-secure)

[57 Best Ruby Gems We Use at RubyGarage](https://rubygarage.org/blog/best-ruby-gems-we-use)

[RubyGarage에서 공개한 루비온레일즈 강의자료들!! 리팩토링 기법이나 BDD적용 방법등 수준높고 좋은 글들이 많은 링크](http://rubygarage.github.io/)

## Ruby 관련 좋은 글들

[(번역)루비 블록을 5분 이내에 마스터하기 translated by Rinae](https://adhrinae.github.io/posts/mastering-ruby-blocks-in-less-than-5minutes-kor)

[Mastering Ruby Blocks in Less Than 5 Minutes posted by Cezar Halmagean
](https://mixandgo.com/learn/mastering-ruby-blocks-in-less-than-5-minutes)

[(번역) 세상은 루비의 의존성 주입에 대한 다른 글을 원한다 translated by Rinae](https://adhrinae.github.io/posts/the-world-needs-another-post-about-dependency-injection-in-ruby-kor/)

[The World Needs Another Post About Dependency Injection in Ruby posted by  Piotr Solnica](http://solnic.eu/2013/12/17/the-world-needs-another-post-about-dependency-injection-in-ruby.html)

[시나트라(Sinatra)로 간단한 Single Page Application(SPA) 제작해 보기 posted by Rinae](https://adhrinae.github.io/posts/simple-spa-application-with-sinatra)

[(번역)나는 'puts' 디버거다 translated by Rinae](https://adhrinae.github.io/posts/i-am-a-puts-debuggerer-kor)

[I am a puts debuggerer posted by  Aaron Patterson](https://tenderlovemaking.com/2016/02/05/i-am-a-puts-debuggerer.html)

[ruby에서 net/http를 이용한 json api call posted by Seotory](https://blog.seotory.com/post/2016/03/ruby-json-api-call-with-nethttp)

[SOLID Object-Oriented Design Principles with Ruby Examples posted by RubyGarage](https://rubygarage.org/blog/solid-principles-of-ood)
