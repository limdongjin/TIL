---
prev: /rails/
---
# Mail 보내기 기능

[mailgun](https://www.mailgun.com/) 이라는 SMTP 서비스를 이용하여 튜토리얼이 진행될것이다.

## 01. mailer 생성

```bash 
$ rails g mailer mymailer
// rails g mailer 메일러이름
```

## 02. mailgun 가입 및 (메일 전송 도메인 생성)

https://www.mailgun.com/ 에서 가입을 완료하고 Domain 메뉴에 들어가면
기본적으로 sandbox 도메인이 있는것을 볼수있다. 
테스트를 할때는 이 도메인으로 이메일 전송기능을 구현하고, 실제 서비스를 진행할때는 메일건에서 도메인을 하나 생성해야한다.
이 튜토리얼에서는 샌드박스 도메인을 기준으로 진행된다.

![](/images/sandbox.png)

## 03. 필요한 Gem 설치

```ruby
# config/Gemfile

...
gem 'mailgun_rails'
...

```

## 04. Rails에 mailgun 설정하기

![](/images/메일건키.png)

도메인이름과 API Key를 환경변수로 저장한다. 
그리고 config/environment/production.rb에 다음과 같이 설정한다. (development 모드에서도 테스트하고 싶다면 development.rb에도 똑같이 설정해준다)

```bash
# config/environment/production.rb

...
config.action_mailer.delivery_method = :mailgun
  config.action_mailer.mailgun_settings = {
    api_key: ENV['MAILGUN_KEY'],
    domain: ENV['MAILGUN_DOMAIN']
}
...
```

## 05. 메일 보내기 

```ruby
# app/mailers/mymailer_mailer.rb (또는 설정한메일러이름_mailer.rb)

class MymailerMailer < ApplicationMailer
  def simple_send(from_email, to_email, title, content) 
    # 메소드 이름이나 파라미터는 임의로 지어준것이므로 자유롭게 변경해서 사용하면된다
    mail(from: from_email,
           to: to_email, 
           subject: title,
           text: content)    
  end
end
```

```ruby 
# 위에서 정의한 메일러 메소드는 다음과 같이 어디서나 호출할수있다.
# 동기적으로 메일을 보낼수도 있고, 비동기적으로 메일을 보낼수도 있다.
...
# .deliver_now를 사용하면 동기적으로 메일이 보내지기때문에 서버에 과부하가 걸릴수도있다.
MymailerMailer.simple_send("example@example.com", "hello@naver.com", "제목", "내용").deliver_now

# 백그라운드에서 메일을 보내도록해야 서버가 멈추는 불상사를 막을수있다. 
# .deliver_later를 사용하면 ActiveJob을 통해서 비동기적으로 메일을 보낼수있다.
MymailerMailer.simple_send("example@example.com", "hello@naver.com", "제목", "내용").deliver_later
...
```

## 06. 메일러 뷰를 생성하여 좀더 메일이 보기좋게 가도록 해보자

app/views/ 폴더를 보면 mymailer_mailer(또는 메일러이름_mailer)라는 폴더가 생긴것을 확인할수있다.
기존에 컨트롤러 액션과 매핑되는 html.erb를 작성해왔듯이 mailer에서도 동일한 방식으로 html.erb를 작성할수있으며, 메일러 메소드에 정의된 모든 인스턴스 변수는 그대로 뷰에서 사용가능하다.

사용법또한 매우 간단하다. 만일 메일러 메소드 이름이 simple_send라면 
app/views/mymailer_mailer/simple_send.html.erb 라는 파일을 생성하고 뷰를 작성하면 된다.

```ruby
# app/mailers/mymailer_mailer.rb (또는 설정한메일러이름_mailer.rb)

class MymailerMailer < ApplicationMailer
  def simple_send(from_email, to_email, title, content) 
    @hello = "Hello World"
    @content = content
    mail(from: from_email,
           to: to_email, 
           subject: title)    
  end
end
```

```html 
# app/views/mymailer_mailer/simple_send.html.erb
<h1> <%= @hello %> </h1>
<hr>
<%= @content %>
```

## Reference

[Action_mailer 문서](https://guides.rubyonrails.org/action_mailer_basics.html)
