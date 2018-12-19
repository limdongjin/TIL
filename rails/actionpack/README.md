---
prev: /rails/
---
# Action Pack 

## Action Pack README.rdoc 번역(의역)

Action Pack은 (웹에서의)요청을 handling하고 응답하는 프레임워크입니다. Action Pack은 여러가지 메커니즘을 제공합니다. 

하나는 URLs 요청을 Action과 매핑하는 *Routing*이고, 

하나는 Action을 implement하고 다양한 format의 템플릿인 *Views*를 렌더링함으로써 응답을 생성하는 *Controller*입니다. 

즉 Action Pack은 MVC 패러다임에서 View 와 Controller 레이어를 제공합니다. 

Action Pack은 몇가지 모듈로 구성됩니다:

* Action Dispatch : web request에 대해서 정보를 파싱해내고, 사용자가 정의한대로 routing을 처리하며, MIME 유형 협상, POST, PATCH 또는 PUT 본문의 매개 변수 디코딩, HTTP 캐싱 논리, 쿠키 및 세션 처리와 같은  HTTP 관련 고급 processing을 합니다. 
  
* Action Controller : Base Controller Class를 제공합니다. 이는 요청을 처리하기 위한 필터와 액션을 구현하기위해 하위 클래스화할수있습니다. 액션의 결과는 일반적으로 Views로부터 생성된 내용입니다.


Ruby on Rails 프레임 워크를 사용하면 사용자는 오직 Action Controller 모듈과 직접적으로 접속할수있다. 필요한 Action Dispatch 기능은 기본적으로 활성화되며 Action View 렌더링은 Action Controller에 의해 암시적으로 트리거됩니다. 그러나이 모듈은 독자적으로 작동하도록 설계되었으며 Rails 외부에서도 사용할 수 있습니다.

(2018.07.26 기준)

## Reference 

[Rails 레포의 Action Pack 설명](https://github.com/rails/rails/tree/master/actionpack)
