## Rails 팁 모음

### 테이블 하나 드랍하기

```bash
$ rails console
> ActiveRecord::Migration.drop_table(:table_name)
```

### rails console에서 sql파일 실행시키기

```ruby
> ActiveRecord::Base.connection.execute(IO.read(“your_file.sql”))
```

### rails console에서 이미지 다운 받기

```ruby
> require 'open-uri'
> open('image.png', 'wb') do |file|
>  file << open('http://example.com/image.png').read
> end
```

### Rails 관련 좋은 글들

[MVC 프레임워크의 문제점 posted by Bluesh](https://bluesh55.github.io/2016/11/26/rails-mvc/)

[(번역)액티브레코드 모델을 리팩토링하는 7가지 방법 translated by Bluesh](https://bluesh55.github.io/2016/09/28/refactor-fat-active-record-model/)

[7 Patterns to Refactor Fat ActiveRecord Models posted by Bryan Helmkamp](https://codeclimate.com/blog/7-ways-to-decompose-fat-activerecord-models/)


### Ruby 관련 좋은 글들

[(번역)루비 블록을 5분 이내에 마스터하기 translated by Rinae](https://adhrinae.github.io/posts/mastering-ruby-blocks-in-less-than-5minutes-kor)

[Mastering Ruby Blocks in Less Than 5 Minutes posted by Cezar Halmagean
](https://mixandgo.com/learn/mastering-ruby-blocks-in-less-than-5-minutes)

[(번역) 세상은 루비의 의존성 주입에 대한 다른 글을 원한다 translated by Rinae](https://adhrinae.github.io/posts/the-world-needs-another-post-about-dependency-injection-in-ruby-kor/)

[The World Needs Another Post About Dependency Injection in Ruby posted by  Piotr Solnica](http://solnic.eu/2013/12/17/the-world-needs-another-post-about-dependency-injection-in-ruby.html)

[시나트라(Sinatra)로 간단한 Single Page Application(SPA) 제작해 보기 posted by Rinae](https://adhrinae.github.io/posts/simple-spa-application-with-sinatra)

[(번역)나는 'puts' 디버거다 translated by Rinae](https://adhrinae.github.io/posts/i-am-a-puts-debuggerer-kor)

[I am a puts debuggerer posted by  Aaron Patterson](https://tenderlovemaking.com/2016/02/05/i-am-a-puts-debuggerer.html)
