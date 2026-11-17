/**
 * 요구사항
- Hook은 현재 페이지가 보이는지를 나타내는 boolean을 반환합니다.
- 최초 값도 실제 페이지 상태를 반영해야 합니다.
- visibilitychange 이벤트를 구독해서 상태를 갱신하세요.
- 컴포넌트가 제거되면 이벤트 리스너를 정리하세요.
- 두 컴포넌트에서 같은 Hook을 사용하세요.
- 브라우저에서만 실행한다고 가정합니다.
 */

import { useState, useEffect } from 'react';

export function usePageVisibility() {
  const [visibility, setVisibility] = useState(document.visibilityState);
  useEffect(() => {
    function handler() {
      setVisibility(document.visibilityState);
    }
    document.addEventListener('visibilitychange', handler);

    return () => document.removeEventListener('visibilitychange', handler);
  }, []);
  return visibility === 'visible';
}

function VideoStatus() {
  const visibility = usePageVisibility();

  return (
    <section>
      <h2>동영상</h2>

      <p>{visibility ? '재생 중' : '일시정지'}</p>
    </section>
  );
}

function ReadingStatus() {
  const visibility = usePageVisibility();

  return (
    <section>
      <h2>독서 상태</h2>

      <p>{visibility ? '읽는 중' : '자리 비움'}</p>
    </section>
  );
}

export default function App() {
  return (
    <>
      <VideoStatus />
      <ReadingStatus />
    </>
  );
}
