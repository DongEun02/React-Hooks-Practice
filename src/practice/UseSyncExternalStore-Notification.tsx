/**
 * 요구사항
- 알림 데이터는 컴포넌트 밖의 store에 보관하세요.
- useSyncExternalStore로 연결하고, useState, useEffect, Context는 사용하지 마세요.
- 새 알림은 목록 맨 앞에 추가하고, ID는 중복되지 않아야 합니다.
- 개별 알림 읽기와 전체 읽기를 구현하세요.
- 읽지 않은 알림 수는 목록에서 계산하세요.
- 기존 배열과 알림 객체를 직접 수정하지 마세요.
- getSnapshot()은 데이터가 바뀌지 않았으면 같은 배열을 반환해야 합니다.
- 이미 읽은 알림을 다시 읽거나, 모두 읽은 상태에서 전체 읽기를 누르면 배열을 새로 만들거나 변경 알림을 보내지 마세요.
- 구독 해제 시 해당 listener만 제거하세요.
 */

import { useSyncExternalStore } from 'react';

// notificationStore.ts
type Notification = {
  id: number;
  text: string;
  read: boolean;
};

let notifications: Notification[] = [
  { id: 1, text: '댓글이 달렸습니다.', read: false },
  { id: 2, text: '프로필이 변경되었습니다.', read: true },
];

let nextId = 3;
const listeners = new Set<() => void>();

function emitChange() {
  // TODO: 모든 listener 호출
  for (const listener of listeners) {
    listener();
  }
}

export function subscribe(listener: () => void) {
  // TODO: listener 등록
  listeners.add(listener);
  // TODO: 구독 해제 함수 반환
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  // TODO: 현재 알림 배열 반환
  return notifications;
}

export function addNotification(text: string) {
  // TODO: 고유 ID를 가진 읽지 않은 알림을 맨 앞에 추가
  notifications = [{ id: nextId++, text, read: false }, ...notifications];
  // TODO: 변경 알림 보내기
  emitChange();
}

export function markAsRead(id: number) {
  // TODO: 해당 알림이 없거나 이미 읽었다면 종료
  if (
    !notifications.some((notification) => notification.id !== id) ||
    notifications.filter((notification) => notification.id === id)[0].read ===
      true
  ) {
    return;
  }
  // TODO: 해당 알림만 읽음 상태로 변경
  notifications = notifications.map((notification) =>
    notification.id === id ? { ...notification, read: true } : notification,
  );
  emitChange();
}

export function markAllAsRead() {
  // TODO: 읽지 않은 알림이 없으면 종료
  if (notifications.every((notification) => notification.read === true)) {
    return;
  }
  // TODO: 모든 알림을 읽음 상태로 변경
  notifications = notifications.map((notification) =>
    notification.read ? notification : { ...notification, read: true },
  );
  // TODO: 변경 알림 보내기
  emitChange();
}

// NotificationDashboard.tsx

// TODO: 필요한 Hook과 store 함수 가져오기

function useNotifications() {
  // TODO: useSyncExternalStore로 알림 배열 반환
  const notifications = useSyncExternalStore(subscribe, getSnapshot);
  return notifications;
}

function UnreadBadge() {
  // TODO: 알림 배열 구독
  const notifications = useNotifications();
  // TODO: 읽지 않은 알림 수 계산
  const count = notifications.reduce(
    (acc, notification) => (notification.read ? acc : acc + 1),
    0,
  );

  return (
    // TODO: '읽지 않은 알림 1개' 형태로 표시
    <p>읽지 않은 알림 {count}개</p>
  );
}

function NotificationList() {
  // TODO: 알림 배열 구독
  const notifications = useNotifications();

  return (
    <section>
      {/* TODO: markAllAsRead 연결 */}
      <button onClick={markAllAsRead}>전체 읽기</button>

      {/* TODO: 실제 알림 배열로 목록 렌더링 */}
      <ul>
        {notifications.map((notification) => {
          return (
            <li key={notification.id}>
              <span>{notification.text}</span>

              {/* TODO: 읽었다면 '읽음' 표시,
              읽지 않았다면 해당 ID를 읽음 처리하는 버튼 표시 */}
              {notification.read ? (
                <span>읽음</span>
              ) : (
                <button onClick={() => markAsRead(notification.id)}>
                  읽기
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function NotificationDashboard() {
  const handleAddNotification = () => {
    addNotification('새 메시지가 도착했습니다.');
  };

  return (
    <main>
      <UnreadBadge />

      {/* TODO: '새 메시지가 도착했습니다.' 알림 추가 */}
      <button onClick={handleAddNotification}>테스트 알림 추가</button>

      <NotificationList />
    </main>
  );
}
