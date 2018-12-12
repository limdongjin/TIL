---
prev: /rails/deploy/
---
# AWS Elastic Beanstalk for Rails  

Rails 웹 프로젝트를 배포를 하기위한 문서이다.

### AWS 설정 for Elastic Beanstalk

0. AWS 로그인 


1. IAM 생성

   A. IAM 관리자 페이지 이동                                                      
   
   B. 사용자(User) 메뉴 클릭 
   
      B-1. 만약 사용자가 생성이 되어있지않다면 다음 절차를 밟은다.
      ```
      
          1) 사용자 추가를 클릭
          
          2) AWS 액세스 유형을 프로그래밍 방식 액세스로 선택후 다음 단계 진행
          
          3) 권한 설정 : "기본 정책 직접 연결" 선택 및 정책 추가후 다음 단계 진행
          
               - AWSElasticBeanstalkFullAccess
          
          4) 반드시!!!! csv파일을 다운로드하여 저장하여야한다
     ```

    B-2. 만약 사용자가 존재하지만, 권한에 AWSElasticBeanstalkFullAccess 또는 ElasticBeanstalk 관련 권한이 존재하지 않는경우

   ```
     1) 해당 사용자를 클릭 
     2) 권한 추가 버튼을 클릭
     3) 권한 설정 : "기본 정책 직접 연결" 선택 및 정책 추가 및 계속 다음단계 진행후 완료
   ```
### Rails 프로젝트 배포 with Elastic Beanstalk  (1) 초기 설정

```
$ cd RailsProjectFolder 
  #rails 프로젝트 폴더로 이동한다.

$ RAILS_ENV=production rake secret 
  #config/secrets.rb파일에 설정된 production의 secret_key_base가 설정이 안되어있다면, 
   해당 커맨드를 통해 생성된 값을 production의 secret_key_base에 붙여넣는다 
   
$ git add -A && git commit -m "eb init 1" 
  #Elastic Beanstalk은 git을 필요로 한다.

$ eb init 
  # credential.csv에 저장되어있는, Acess Key ID 와 Secret Key를 순차적으로 입력한다.
  
# 필수 #
.gitignore에 .elasticbeanstalk/ 폴더를 추가한다. 
```
### Rails 프로젝트 배포 with Elastic Beanstalk  (2) 배포 시작! 완료!

```
$ git add -A && git commit -m "eb deploy start"
  # .gitignore가 제대로 설정되어있는지 확인후 실행한다.
$ eb create myfirstdeploy 
  # eb create <deploy_name>
```

### Rails + Elastic Beanstalk 관련 유용한 자료 모음 

[How to set up a Rails 4.2 app on AWS with Elastic Beanstalk and PostgreSQL posted by Julian Tescher](https://hackernoon.com/how-to-set-up-a-rails-4-2-app-on-aws-with-elastic-beanstalk-and-postgresql-3f9f29c046e2)

[How to Deploy a Ruby on Rails Application to Elastic Beanstalk posted by Jason Swett](https://www.awsrails.com/rails-elastic-beanstalk/)

[(한글)RubyonRails AWS Elastic Beanstalk setting posted by ahntae](https://medium.com/ufofactory-org/rubyonrails-aws-elastic-beanstalk-setting-80181ae7b2ea)
