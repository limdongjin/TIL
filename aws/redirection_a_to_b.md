---
description: A도메인으로 온 요청을 B도메인으로 redirection 시키고 싶다면? (Route53 + S3)
tags: ["route53","s3", "aws"]
---
# `A도메인으로 온 요청을 B도메인으로 redirection 시키고 싶다면? (Route53 + S3)`

서비스를 운영하다보면 기존의 도메인을 새로운 도메인으로 바꾸는 상황이 발생하곤한다.
사용자들은 A라는 도메인으로 이 서비스를 알고있지만 앞으로는 B도메인으로 사용하도록 하길 원한다면 어떻게 해야할까?

AWS Route53 과 S3와 함께라면 매우 간단하게 해결할수있다. 이 튜토리얼은 A도메인이 Route53에 등록되어있다는 가정하에 진행된다.

그리고 편의를 위해 기존 도메인인 A도메인을 http:// aexample.com이라 하고 새 도메인인 B도메인을 https:// bexample.com이라 하겠다.

1. S3에서 기존 도메인 이름과 같은 버켓을 하나 생성한다. ( ex, aexample.com 이란 이름의 버켓으로 생성한다 )

2. S3의 속성(Properties)메뉴에 들어가서 정적 웹 호스팅(Static Website Hosting)을 클릭하고 요청 리다이렉션( Redirect all requests to another host name)을 클릭한다.

3. 그러면 "대상 버켓 또는 도메인"이라는 input 칸과 "프로토콜" input 칸이 나올것이다. 여기서 "대상 버켓 또는 도메인"에  리다이렉션 시키고 싶은 도메인을 적고, http또는 https를 적고 저장버튼을 누른다.
(ex, "대상 버켓 또는 도메인": bexample.com, "프로토콜": https )

4. 기존 도메인 aexample.com 의 Route53 메뉴로 들어가서, aexample.com 도메인 A 타입 레코드가 이미 있다면 수정버튼을 누르고 없다면 생성 버튼을 누른다.
Record Type은 A – IPv4 address. Alias는 Yes, Alias Target은 방금 생성해준 S3버켓을 선택한다. 나머지 속성들은 기본적으로 설정되어있는 설정을 유지하고 제출한다.

5. 완료!

기존 도메인이 https인경우에는 아래 레퍼런스 링크를 참고하면된다.

## References

[Redirecting a domain with HTTPS using Amazon S3 and CloudFront](https://simonecarletti.com/blog/2016/08/redirect-domain-https-amazon-cloudfront/)




