# React Hooks Practice

React의 여러 Hook을 직접 구현하며 학습하는 실습 저장소입니다.
각 파일에 적힌 요구사항을 바탕으로 상태 관리, DOM 제어, 이벤트 구독 등의 패턴을 연습합니다.

## 시작하기

Node.js와 npm이 설치된 환경에서 아래 명령을 실행합니다.

```sh
npm install
npm run dev
```

터미널에 표시되는 로컬 주소로 접속합니다.

현재 `src/App.tsx`는 빈 `<main>`을 렌더링합니다. 실습 화면을 보려면 원하는 컴포넌트를 가져와 렌더링하세요. 예를 들어 `useRef` 실습은 다음과 같이 연결합니다.

```tsx
import './App.css';
import UseRef from './practice/UseRef';

function App() {
  return (
    <main>
      <UseRef />
    </main>
  );
}

export default App;
```

## 실습 목록

| 파일                                                  | 학습 주제                         | 실습 내용                                                                       |
| ----------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------- |
| [UseRef.tsx](src/practice/UseRef.tsx)                 | `useRef`, `useState`, `useEffect` | 입력창 포커스 제어, 메모 저장, 타이머 취소와 정리                               |
| [UseContext.tsx](src/practice/UseContext.tsx)         | `useContext`, `useReducer`        | 장바구니 상태와 dispatch 분리, 상품 추가·수량 감소·삭제·전체 비우기             |
| [CustomHook.tsx](src/practice/CustomHook.tsx)         | 커스텀 Hook                       | `visibilitychange` 이벤트를 구독하는 `usePageVisibility`를 두 컴포넌트에서 사용 |
| [UseActionState.tsx](src/practice/UseActionState.tsx) | `useActionState`                  | 닉네임 폼 검증, 비동기 등록, 성공·실패 메시지와 제출 중 상태 관리               |

실습 코드는 작성 중이며, 요구사항과 TODO가 포함되어 있습니다.

## 학습 방법

1. 실습 파일 상단의 요구사항을 읽습니다.
2. TODO를 구현하고 필요한 타입을 정의합니다.
3. `src/App.tsx`에 실습 컴포넌트를 연결합니다.
4. 브라우저에서 요구사항에 맞게 동작하는지 확인합니다.
5. `npm run lint`와 `npm run build`로 코드와 타입을 확인합니다.
