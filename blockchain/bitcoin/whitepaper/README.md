# 비트코인 백서 정리 및 요약


## 1. Introduction 

생략.

## 2. 거래(Transactions)

이 그림이 비트코인의 Transaction을 가장 잘 표현하고있음. 
[](/images/bitcoin-transaction.PNG)

백서에서는 위의 그림과 함께 간략한 설명들이 이 챕터의 전부이기에 좀더 이해를 돕기위해 이를 좀더 풀어서 정리를 하고자함.

### 전자 화폐의 정의

비트코인 백서에서는 "전자 화폐"를 디지털 서명의 연속으로 정의한다.
<br>
좀더 풀어서 설명하면 전자화폐는 이전에 거래를 누구 누구랑 얼마만큼 해왔는지, 현재 갖고있는 돈이 얼마인지를 보여주는 장부 또는 증명서로써의 역활을 하는것임.
<br>

### (중앙 집권X, 블록체인X인 상태에서의) 거래 방식

비트코인의 Transaction을 이해하기위해서는 전자 거래의 가장 원초적인 방식을 생각해봐야한다. 
백서에 서술된 전자화폐의 정의에 의하여 A가 B에게 1코인을 보내는 거래를 하는 상황을 가정해보자. 

A는 자신이 갖고 있는 이전 거래 내역( A의 장부 )에 B와의 새로운 거래 내역을 추가하면서 여기에 B의 공개키(계좌 번호)를 적고 자신의 비밀키로 암호화하는 서명하여 B에게 자신의 장부를 넘긴다. B는 A의 장부를 보고 이상이 없으면 거래가 완료된다. 

이 방식의 가장 결정적인 문제점은, *이중지불*을 하기 쉽다는 것이다. 간단히 말하면 A가 장부를 조작하거나 동시 거래를하여 A의 잔액을 넘는 부당 거래를 할수있다는것이다.

### 이중 지불이 가능한 이유에 대한 설명

(중앙집권X, 블록체인X인 상태에서의)원초적인 전자 거래에서 이중 지불이 가능한 이유는 간단함. 

비유적으로 설명하자면 전자거래는 단순히 "A는 B에게 1코인을 보냈습니다"라는 문장을 장부에 적는 행위에 불과하기때문에 A는 자신이 "1코인이 있다"라는 것을 증명하는 장부를 갖고 있기만 하면 1코인 송금을 할수있기때문임. 즉 조작된 장부만을 갖고있다면 이중지불이 가능해짐.

또한 원초적인 거래 방식은 중앙 집권 주체가 있는 거래 방식과는 달리 장부를 증명하는 과정이 오직 A 와 B 둘이서 이뤄지는것뿐이기에 장부를 조작하는것이 쉬움. 

### 비트코인이 제시하는 이중 지불 해결책

이중 지불에 대한 통상적인 솔루션은 중앙통제기관이나 조폐국을 두어서 이중 지불을 해결하는 것이었다고함.하지만 이러한 중앙 집권 방식은 여러가지 문제가 있기에 비트코인은 새로운 솔루션을 제시하고있는것임.

<br>

비트코인이 제시한 해결책은 아래와 같음.

> We need a way for the payee to know that the previous owners did not sign any earlier
  transactions. For our purposes, the earliest transaction is the one that counts, so we don't care
  about later attempts to double-spend. The only way to confirm the absence of a transaction is to
  be aware of all transactions. In the mint based model, the mint was aware of all transactions and
  decided which arrived first. To accomplish this without a trusted party, transactions must be
  publicly announced [1], and we need a system for participants to agree on a single history of the
  order in which they were received. The payee needs proof that at the time of each transaction, the
  majority of nodes agreed it was the first received. 


> (한글 번역)수취인의 입장에서 자신이 받은 코인은 이전 소유자가 어떤 거래에도 (기존 코인의 잔액을 이용한) 서명을 사용하지 않았다는 것을 확인할 방법이 필요하다. 이런 목적에서 우리는 가장 앞선 거래 하나를 인정하고, 이후 이중지불 시도에는 신경쓰지 않는다. **그런 (이중 지불된) 거래가 없음을 확인할 유일한 방법은 모든 거래를 인식하고 있는 것뿐이다.** 조폐국 기반 모델에서, 조폐 국은 모든 거래를 인식했고 최초로 받은 거래를 (승인 대상으로) 결정했다. 신뢰받는 (제3)자 없이 이 방식을 실 현하려면, 거래는 공개적으로 알려져야 하고[1], 노드들이 거래를 받는 순서의 단일 이력에 합의하는 시스템이 필요하다. **수금자는 매 거래시 그게 첫 수금이라는 것에 노드 다수가 동의했음을 증명해야 한다.**


## 3. 타임스탬프 서버(Timestamp Server)

> The solution we propose begins with a timestamp server.

[](/images/bitcoin-timestamp-en.png)

### 타임스탬프 서버의 정의

>  A timestamp server works by taking a
  hash of a block of items to be timestamped and widely publishing the hash, such as in a
  newspaper or Usenet post [2-5]. The timestamp proves that the data must have existed at the
  time, obviously, in order to get into the hash. Each timestamp includes the previous timestamp in
  its hash, forming a chain, with each additional timestamp reinforcing the ones before it.

> (한글 번역)타임스탬프 서버는 시간 내역이 기록된 항목들의 블록 해시를 취합하고, **신문이나 유즈넷 포스트 처럼 그 해시를 널리 발행하는 역할을 한다.** 이러한 타임스탬프 내역은 해시에 포함될수있도록 그 시간에 데이터가 명백히 존재했다는 것을 입증한다. **각 타임스탬프 내역은 이전 타임스탬프로부터 받은 해시 내역을 포함시킴으로써 보강하는 체인을 형성한다**

## 4. 작업 증명(Proof-of-Work)

### 비트코인 백서에 서술된 비트코인의 작업증명 방식

> For our timestamp network, we implement the proof-of-work by incrementing a nonce in the
  block until a value is found that gives the block's hash the required zero bits. Once the CPU
  effort has been expended to make it satisfy the proof-of-work, the block cannot be changed
  without redoing the work. As later blocks are chained after it, the work to change the block
  would include redoing all the blocks after it. 

> (한글 번역)타임스탬프 네트워크에서는 작업증명의 방법으로 블록 해시 결과가 0비트들을 갖도록 하는 해시값을 찾을때까지 블록에 임시값(nonce)를 증가 시키는 과정을 구현한다. CPU가 노력한 결과가 한번 작업 증명 조건에 도달하게 되면, 그 블록은 다시 과정을 번복하지 않는 한 고정된다. 그 다음 블록들이 체인을 형성함으로써, **하나의 블록을 변경하기 위해서는 그 블록을 포함한 다음 모든 블록들에 대한 작업 증명 과정을 다시 수행해야 하게된다.**  

> The proof-of-work also solves the problem of determining representation in majority decision making. 

> (한글 번역)또한, 작업증명 방식은 다수결 의사결정에서 대의의 문제를 해결한다. 

> The majority decision is represented by the longest chain, which has the greatest proof-of-work effort invested in it. If a majority of CPU power is controlled by honest nodes, the honest chain will grow the fastest and outpace any competing chains. 

> (한글 번역)다수의 결정은 가장 긴 체인을 나타내며, 이는 가장 많은 작업증명에 노력이 투입 된 것이 된다. 컴퓨팅 파워의 **과반수가 정직한 노드들에 의해 제어되고 있다면, 정직한 체인이 가장 빠르게 늘어나, 경쟁체인을 압도하게 될 것이다.**

> To modify a past block, an attacker would have to redo the proof-of-work of the block and all blocks after it and then catch up with and surpass the work of the honest nodes.

> (한글 번역)과거의 블록을 수정하기 위해서는 공격자는 수정할 블록과 그 이후에 있는 체인보다 더 빠른 속도로 따라잡아 추월해야 한다. 

비트코인의 Proof-of-Work방식을 간단히 설명하자면 비트코인의 블록체인은 노가다를 통해 증명이 이루어지는 공개 장부인것임.

## 5. 네트워크

생략.

## 6. 보상(Incentive)

> By convention, the first transaction in a block is a special transaction that starts a new coin owned
  by the creator of the block. This adds an incentive for nodes to support the network, and provides
  a way to initially distribute coins into circulation, since there is no central authority to issue them.

> (한글 번역)관례상 블록 안의 첫 거래는 블록을 만든 이의 몫이 될 새 화폐로 시작하는 특별한 거래다. 이는 화폐를 발행하 는 중앙기관 없이, 노드가 네트워크를 지원할 인센티브를 더해 주며 초기에 발행한 화폐를 유통할 방법을 제공 한다.

블록 만들면 비트코인으로 보상해줌. (채굴)

## 7. 저장 공간의 재사용(Reclaiming Disk Space)

생략. 비트코인의 저장공간 최적화 방법을 소개하는 챕터임. 머클트리.

## 8. 지불 입증 간소화(Simplified Payment Verification)

> A user only needs to keep
  a copy of the block headers of the longest proof-of-work chain, which he can get by querying
  network nodes until he's convinced he has the longest chain, and obtain the Merkle branch
  linking the transaction to the block it's timestamped in. 

> (한글 번역)사용자는 그가 최장 작업증명 사슬을 가졌다고 확신할 때까지 네트워크 노드를 조회해,얻을 수 있는 가장 긴 사슬의 블록 헤더 사본을 유지하면서,해당 거래 를 타임스탬프가 찍힌 블록에 연결한 머클 분기를 얻기만 하면 된다.

## 9. 가치의 병합과 분할(Combining and Splitting Value)

한 거래에 복수의 입력, 복수의 출력이 가능

## 10. 개인 정보 보호 (Privacy)

공개키의 익명성으로 개인정보가 보호됨. 또한 공개키가 알려지더라도 새로운 공개키를 사용하여 거래를 진행하면됨.

## 11. 계산(Calculus)

생략. PoW의 수리적, 통계적 검증에 대한 내용

## Reference

[Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf)

[Bitcoin 백서 한글 번역본](https://cryptokiwi.kr/currency?id=btc&category=3&content_id=228)
