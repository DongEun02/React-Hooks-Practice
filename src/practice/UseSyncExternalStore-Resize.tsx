/**
 * 요구사항
1. useViewport()는 { width, height }를 반환합니다.
2. useState, useEffect 없이 useSyncExternalStore를 사용하세요.
3. 최초 렌더링부터 실제 window.innerWidth, window.innerHeight를 반영하세요.
4. 크기가 같으면 getSnapshot()은 같은 객체 참조를 반환해야 합니다.
5. 크기가 달라졌다면 새 객체를 반환하고, 이전 객체는 수정하지 마세요.
6. Hook을 여러 곳에서 사용해도 window의 resize 리스너는 하나만 등록하세요.
7. 첫 구독자가 생기면 이벤트를 등록하고, 마지막 구독자가 사라지면 제거하세요.
8. 브라우저에서만 실행한다고 가정합니다.
 */

import { useSyncExternalStore, useState } from 'react';

// viewportStore.js

const listeners = new Set<() => void>();
let cachedSnapshot = null;

function handleResize() {
  // TODO: 등록된 모든 listener 호출
  for (const listener of listeners) {
    listener();
  }
}

export function subscribe(listener) {
  // TODO: listener 등록
  listeners.add(listener);

  // TODO: 첫 구독자가 등록된 경우에만
  // window에 resize 이벤트 리스너 등록
  if (listeners.size === 1) {
    window.addEventListener('resize', handleResize);
  }

  return () => {
    // TODO: 이 listener만 제거
    listeners.delete(listener);
    // TODO: 구독자가 더 이상 없으면
    // window에서 resize 이벤트 리스너 제거
    if (listeners.size === 0) {
      window.removeEventListener('resize', handleResize);
    }
  };
}

export function getSnapshot() {
  // TODO: 현재 브라우저의 width, height 읽기
  const width = innerWidth;
  const height = innerHeight;
  // TODO: 캐시가 없거나 크기가 바뀌었으면 새 객체를 캐시에 저장
  if (
    cachedSnapshot === null ||
    cachedSnapshot.width !== width ||
    cachedSnapshot.height !== height
  ) {
    cachedSnapshot = { ...cachedSnapshot, width, height };
  }

  // TODO: 캐시된 객체 반환
  return cachedSnapshot;
}

// useViewport.js

// TODO: 필요한 React Hook과 store 함수 가져오기

export function useViewport() {
  // TODO: useSyncExternalStore로 스냅샷을 읽고 반환
  const size = useSyncExternalStore(subscribe, getSnapshot);

  return size;
}

// App.jsx

// TODO: 필요한 React Hook과 useViewport 가져오기

function SizeDisplay() {
  // TODO: useViewport 호출
  const { width, height } = useViewport();

  return (
    <section>
      <h2>화면 크기</h2>

      {/* TODO: '너비 1024px / 높이 768px' 형태로 표시 */}
      <p>
        너비 {width}px / 높이 {height}px
      </p>
    </section>
  );
}

function LayoutGuide() {
  // TODO: useViewport 호출
  const size = useViewport();

  return (
    <section>
      <h2>레이아웃 안내</h2>

      {/* TODO: 너비가 768 미만이면 '모바일 레이아웃',
          그 외에는 '데스크톱 레이아웃' 표시 */}
      <p>{size.width < 768 ? '모바일 레이아웃' : '데스크톱 레이아웃'}</p>
    </section>
  );
}

export default function ViewportDashboard() {
  // TODO: 두 구독 컴포넌트를 함께 표시/제거할 state 선언
  const [isShow, setIsShow] = useState(false);

  return (
    <main>
      {/* TODO: 표시 상태를 전환하는 클릭 이벤트 연결 */}
      <button onClick={() => setIsShow((prev) => !prev)}>
        구독 컴포넌트 표시 / 제거
      </button>

      {/* TODO: 표시 상태일 때만 두 컴포넌트 렌더링 */}
      {isShow && (
        <>
          <SizeDisplay />
          <LayoutGuide />
        </>
      )}
    </main>
  );
}
