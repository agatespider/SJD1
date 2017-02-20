# 정리 (미정리)

## 1.1 정리의 목적
신입인데 경력을 속이고 SI/SM을 파견가거나... 사수도 없고 맨토도 없이 묵묵하게 생각없이 일만하는 저 같은 사람을 위해서 정리를 시작하게 되었습니다.
 
개발을 하면서 더 좋은 방법으로 개발할 수는 없는 것인가? 또는 100,200페이지 정도만 되는 사용법만 목적인 책을 보고 사용법만 파악 후 이렇게만 쓰는 것이 정답인가? 더 좋은 방법은 없나? 근본원인은 먼지? 이러한 것들을 저는 고민을 안했습니다.

그렇기에 막히는 부분도 있고 설명도 못하는 부분도 있습니다. 그런것들을 하나하나 정리하고 제가 정리하는 이 자료가 저와 같은 사람들에게 도움이 되었으면 합니다.
    
분명 틀린 부분도 존재합니다. 그런것들이 있다면 저에게 메일이나 댓글을 통해서 정리해 주신다면 감사히 다시 재정리를 하겠습니다.

## 1.2 javascript에 대해서 잠시 고민의 시간을 갖는게 어떨까요?
javascript를 접하는 사람들은 대부분이 web화면에서의 element들의 이벤트를 설정하거나 구조를 변경하기 위해 처음 사용해본다고 전 생각이 듭니다.

아닌 곳도 있지만 저는 처음에 javascript를 그런 목적에 접근을 했었습니다. 그렇기에 위 처럼 생각을 하고 있습니다.
 
아무튼 현재 여러분은 javascript를 사용하지만 주로 jquery나 jquery에서 파생된 여러 plugin을 사용해서 화면을 구성하고 있지 않으신가요?
 
당연히 경험도 있고 여러 프로잭트를 거쳐오면서 고객이 원하는 사이트를 jquery와 javascript를 통해서 개발을 하고 성공적으로 마무리 짓고 오셧을 것이라 생각이 듭니다. 아니면 react나 angular, vue같은 javascript framework를 사용하기도 합니다.

하지만 이 jquery나 framework라는 것이 내부적으로 어떻게 구현이 되어있는지 대해서 고민을 해보신적이 있으신가요? 또는 내가 개발했던 코드의 로직들이 고객의 변심으로 인해서 크게 바뀌어서 전체적으로 대대적인 수정을 하시면서 고생한 적은 없으셨나요?

아니면 stack overflow나 나말고 다른사람이 개발한 코드를 보면서 이해를 못하는 코드들이 있으셨나요?

또는 this? cluser?이런것을 왜 사용하는지? stack overflow를 보면서 코드만 복사해서 붙여넣고 이 코드가 실제 어떻게 동작하는지? 이런 의문을 가져보신적이 없으셨나요? 왜 이런 로직이 동작하는지? 왜? 라는 것을 생각해보신적이 있으신가요?

챙피하게도 저는 없었습니다. 그래서 이제와서 공부하고 정리하고 있습니다.
 
아무튼 지금 부터 정리하는 것들은 위와 같은 것을 생각하지 않은 저와 같은 사람들에게 도움이 되고자 정리합니다.
  
## 1.3 rj3.js
rj3.js는 svg선을 그리기 위한 path의 d속성을 구하는 기능을 하는 javascript 입니다. 이 코드를 보시면 아래와 같은 javascript의 특징을 사용하는 것을 볼 수 있습니다.
  
### 1.3.1 함수는 다른 함수 내부에서 선언 할 수 있습니다. (scope와 ec에 관해서 정리 해야할 필요가 잇음)
rj3.svg.line함수에서 내부 함수로 line이라는 함수를 선언 하고 있습니다. 이것은 함수안에서 함수를 선언할 수 있음을 뜻합니다.

### 1.3.2 javascript함수는 일급객체로써 parameter로 받거나 넘길 수 있으며 return(반환)값으로 넘길 수 있습니다.
rj3.svg.line함수는 내부에 선언한 line함수를 반환 하고 있습니다. 그리고 line.x와 line.y함수는 인자로 함수를 받고 있습니다. javascript에서의 함수는 일급객체로써 인자로 주거나 받을 수도 있지만 또한 자신만의 property와 method도 가질 수 있습니다.

    line.x = function(getXImpl) { //line은 함수이며 x라는 property를 가지며 getXImpl이라는 함수를 파라메트로 받습니다.
        if(!arguments.length) return getX;
        getX = getXImpl; // getX함수에 getXImpl함수로 변경 할 수 있습니다.
        return line;
    }

## 1.3.3 rj3.js 설명
주요 하게 볼 곳은 rj3.svg.line함수 안에 line함수 입니다. 이 line함수의 역할은 인자로 받은 배열 값을 반복하면서 반복되는 값에 따른 좌표값을 생성하고 그것을 문자열로 넘겨주는 역할을 합니다.

    // 배열값을 반복하면서 각각의 값을 getX와 getY함수를 실행하여 값을 구하고 그 값을 points라는 배열에 넣는 작업입니다. 
    while(++i < n) {
        d = data[i];
        points.push([getX.call(this, d, i), getY.call(this, d, i)]);
    }
    
그리고 getX와 getY가 있습니다. 이것은 parameter로 받는 데이터를 getX와 getY의 로직을 통해 나오는 값을 반환해주는 역할입니다. 
    
    var getX = function(point) {
            return point[0];
        },
        getY = function(point) {
            return point[1];
        },

그리고 line.x와 line.y는 파라메터로 넘어오는 값이 있을 경우 getX와 getY를 파라메터 함수로 바꾸어주는 역할을 합니다.

    line.x = function(getXImpl) {
        if(!arguments.length) return getX;
        getX = getXImpl;
        return line;
    }

    line.y = function(getYImpl) {
        if(!arguments.length) return getY;
        getY = getYImpl;
        return line;
    }

위 3개의 코드를 보면 의문이 드는게 있습니다. 왜? getX와 getY를 line.x와 line.y에서 변경을 하려고 하는걸까요?

변경하려는 이유는 상황에 따라서 변경을 해야 하니까 변경을 하는 것이라고 생각이 들겠죠? 이런 라인은 point[0]이 x좌표가 아닌 point[0] * 10이야 이럴경우를 예로 들수 있겟죠

이 코드는 SOLID원칙의 개방/폐쇄 원칙(Open/Closed Principle)을 따르는 코드라고 할 수 있습니다.

개방/폐쇄 원칙이란 어떠한 경우라도 실행되는 코드(line() 함수)를 변경하지 말고 어떻게든 재사용하고 확장하라는 뜻입니다.

그리고 변경하지 않을 순 없지만 최소화 시킬수는 있습니다. 그리고 rj3.js의 코드를 만든 사람은 svg path의 d속성 값을 구함에 있어서 좌표값(X,Y)를 구하는 방식과 보간(interpolate)의 방식에 변경사항이 있을것이라 예상하고 분리를 시켜놓은 것입니다.
 
실제 현업에서는 이러한 작업들은 업무에 대한 경험과 노하우에서 찾아내서 분리를 할 수 있습니다.

경험과 노하우가 없다하더라도 계속 생각하면서 개발하면 좋은 코드가 나올 것이라 장담합니다.

그리고 line.x와 line.y는 리턴값으로 line을 반환 하고 있습니다. 왜 이렇게 썻냐면 체이닝을 위한것인데 이것은 아래와 같이 쓰기 위해서입니다. 체이닝이란 자신을 반환하는 메소드를 뜻합니다. 사실 자신을 넘긴다 하니 return this;로 넘겨도 무방합니다.

    var lineGenerator = rj3.svg.line();
    
    lineGenerator
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; });

그리고 클로저란 것을 간략히 설명하려고 합니다. 자세한건 차후에 별도 링크를 걸겠습니다. 클로저는 javascript의 중요한 특징중 하나입니다. 꼭 기억해두시길 바랍니다.

코드를 보시면 의아 한게 있습니다. rj3.svg.line은 내부 함수 line을 반환후 종료가 됩니다. 그런데 아래처럼 line함수를 실행 할 경우 rj3.svg.line의 getX,getY함수에 접근하는지 참 이상합니다.
  
일반적으로 생각하면 rj3.svg.line()함수가 line을 리턴하고 종료하는 순간 스택에서 사라질 것이라고 예상을 할 수 있습니다. 그런데 그렇게 되지 않고 계속적으로 사용할 수 있습니다. 신기 하지 않습니까? 

    var lineGenerator = rj3.svg.line();
    grapher.lineGenerator(arrData);
    ...
    while(++i < n) {
        d = data[i];
        points.push([getX.call(this, d, i), getY.call(this, d, i)]);  // 어떻게 getX와 getY를 사용 할 수 있는 것일까요?
    }

rj3.svg.line()이 line함수를 반환할 것이라 생각하지만 실제로는 클로저란것을 반환합니다. 클로저란 함수 같은 객체지만, 함수를 생성하는 당시의 환경을 내부적으로 고스란히 간직합니다. 즉 내부 line.x나 line.y같은 line에 잇는 함수들을 호출할 때 함수 생성당시 환경을 전부 기억하고 그것을 사용 할 수 있습니다.

## 1.3.4 pathFromFunction.js와 this
javascript에서 this의 의미는 현재 실행되는 실행범위(execute context)를 뜻합니다. 이 this는 설계 관점에서 많이 중요합니다.

line함수의 while을 통한 반복문을 보면 의아합니다. 굳이 꼭 call을 이용해서 사용해야 하나? 그냥 getX(d) 이렇게 해주면 안되는것인가? 이런 의문이 듭니다.

    while(++i < n) {
        d = data[i];
        points.push([getX.call(this, d, i), getY.call(this, d, i)]);  // 왜 call을 사용하지? 그냥 getX(d), getY(d)와 같은거 아닌가?
    }
    
이런 의문을 해소해주는 예제가 바로 pathFromFunction.js입니다. 

pathFromFunction.js의 rj3.svg.samples.functionBaseLine함수는 svg의 path의 d속성 값의 x, y좌표를 구하는 함수입니다.

functionBaseLine은 y를 구하는데 y는 계산에 사용할 데이터를 parameter로 받지 않고 this.getValue(d)를 통해서 데이터를 받고 있습니다. 이것은 이 funtionBaseLine함수를 실행하는 객체의 getValue()를 사용하겠다는 뜻입니다.

functionBaseLine은 x좌표는 내가 알아서 하겟지만 y좌표를 그릴때 사용하는 데이터를 this.getValue(d)형태로 받을꺼야 그러니까 나를 쓰려면 getValue를 구현해줘라는 뜻입니다.

yearlyPriceGrapher는 이 functionBaseLine을 사용할것이기 때문에 y좌표에서 쓸 getValue를 구현하고 있습니다.

왜 이렇게 분리를 했을까요? 저는 이렇게 생각합니다. functionBaseLine은 자신만의 규칙이 있습니다. 이것은 데이터의 x,y만을 구하는 역할을 담당합니다. 그리고 나는 오직 나의 이 공식만을 유지 할꺼니 넘겨줄 데이터에 대한 변형을 나에게 맡기지 말고 사용하려는 너가 제공해 이런 뜻으로 분리 했다고 생각합니다.

이렇게 되면 functionBaseLine은 자신은 오직 자식의 공식에 마춰서 x,y만 구하면 되기 때문에 거의 변할 일이 없게 됩니다. 그리고 이것을 사용하는 쪽에서 구현만 해주면 되는 것이죠. yearlyPriceGrapher에서 getValue를 구현한거처럼요.

어떻게보면 기존 line.x와 비슷하다고 생각하지 않나요? line.x는 구현 로직을 함수의 파라메터로 넘겨서 기능을 분리 했지만 functionBaseLine은 this를 사용해서 비슷하게 로직을 분리 했습니다.

## 1.3.5 SOLID, DRY를 가만히 생각해봐요
SOLID나 DRY나 소프트웨어 공학 원칙에서 나오는 용어입니다. 이 용어의 목적은 제 생각이지만 아마도 개발은 편하게 하려는 목적에서 나왔다고 생각합니다.
 
생각해보세요. 개발을 하고 있습니다. 기능을 위한 변수들을 선언하고 그곳에 데이터를 넣고 빼고 이런형태로 개발을 할 것입니다. 당연합니다. 프로그램이란 결국 변수에 값을 넣고 빼서 사용하는 것이니까요.

그런데 내가 만들었지만 변수가 많아지면 많아질수록 함수가 많아지면 많아질수록 이 변수를 무슨의미로 사용했는지 모르겟고 이 함수들이 무엇을 뜻하는지 의미를 이해를 못하게 됩니다.

몽땅 기억하고 있다면 괜챃습니다. 그러면 그렇게 개발해도 상관없습니다. 하지만 혼자서 평생 짊어질 코드가 아니라면 자신이 아닌 다른 사람들도 이해할 수 있는 그런 방식이 필요할 것입니다.

SOLID나 DRY가 나왔다고 생각합니다.

그런데 이것들도 결국 코드를 얼마나 깔끔하게 분리하는데 그 의미를 두고 있습니다. 아마 최초 시작점은 중복 코드를 만들지 말자로 시작했을겁니다. DRY는 Don't Repeat Yourself라는 단어의 축소형으로 반복하지 말라는 뜻입니다.
 
SOLID는 이런 반복에서 언젠가 고객의 요구사항이나 내가 이해못한 것에 대해서 코드가 변경이 일어났을때 최소화 시킬수 있는 방법에 대해서 정의를 해놓은 것입니다.

SOLID의 각각의 원칙 단일책임의원칙, 개방/폐쇄, 리스코프치완원칙, 인터페이스분리원칙, 의존성역전원칙이 이해가 어렵다면 한번 rj3.js나 pathFromFunction.js처럼 반복과 변경가능성 있는 로직을 어떻게 하면 분리할 수 있을 까에 관해서 고민을 하시면 자동적으로 이 두개의 원칙이 이해가 될 것이라고 생각이 듭니다.

## 1.3.6 테스트 코드
변경이 될 코드나 중복이 발생할 코드를 예상하는 것은 의외로 어렵습니다. 몇년간 해왓던 업무와 기능이라면 당연하게도 경험에 의해서 알게 되겠지만 생소한 기능을 구현함에 있어서는 매우 어렵습니다.

그렇다면 어떻게 해야 하는가? 라는 생각이 듭니다.

우선 업무를 잘 알고 있어야 합니다. 그리고 이런 업무를 단위별로 쪼개고 그것들을 미리 테스트를 합니다. 그리고 테스트된 바탕으로 코드를 리펙토링 하며 프로그램을 완성하면 됩니다.

이런 테스트 단계가 중요한 이유는 내가 업무를 제데로 이해했는지와 오직 성공만을 위한 코드를 만드는 것 그리고 미리 리펙토링을 하는것입니다.

이게 근데 정말 어렵습니다. 여태껏 이렇게 개발을 안해왔으니까요...
 
혹시 이런적 없으신가요? 여러분이 짠 코드가 불안불안하는거... 예를 들어 개발하고 나서 단위테스트나 통합테스트에 와서 아 불안하다 이런느낌 받아보신적 없으신가요? 아니면 실제 운영시점에서... 잘돌아가나?

테스트 코드 또한 만들기 힘듭니다. 무엇을 테스트 할것인가? 이것이 참 알기 힘듭니다.

보통 단일 책임 원칙을 통해서 하나의 관심사에 대한 기능을 만들고 그것을 테스트를 합니다. 하지만 이런 하나의 관심사를 어떻게 분리하고 찾는 것은 경험에서 우러나오는 것입니다.

이렇게 테스트 코드를 먼저 개발하면 장기적으로 이상없는 단위 테스트 항목들을 구성할 수 있습니다. 그리고 기능과 기능간의 인터페이스를 설계할때 도움이 됩니다. 그리고 최초에는 모르지만 중후반부터는 더 빨리 개발을 할 수 있게 됩니다.

다음장부터는 이런 것을 어떻게 사용하는지 상세하게 정리를 하겠습니다.

# 2. 세부 정리 필요성이 있는 것
* 클로저
* this 사용법
* execute context






