# usePreservedCallback 재현 실험

`react-simplikit`에서 `usePreservedCallback`을 그대로 import한 최소 React 프로젝트입니다.

```sh
npm install
npm run dev
```

브라우저에서 안내된 주소를 열고 개발자 도구 콘솔을 켠 뒤, 입력창의 `abcd` 뒤에 `e`를 입력하세요. `onChange`, `layout effect`, 두 번째 `onChange` 순서의 로그와 입력값을 확인할 수 있습니다. 다시 실험하려면 페이지를 새로고침하세요.

재현 코드는 `src/PreservedCallbackRepro.tsx`에 있습니다.
