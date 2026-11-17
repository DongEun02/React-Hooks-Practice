/**
 * 요구사항
1. ‘입력하기’를 누르면 입력창에 포커스가 이동합니다.
2. ‘저장’을 누르면 현재 입력 내용이 저장되고, “저장 완료”가 2초간 표시됩니다.
3. 2초 안에 다시 저장하면, 마지막으로 저장한 시점부터 2초 뒤에 메시지가 사라집니다.
4. ‘초기화’를 누르면 입력 내용과 저장 내용, 메시지가 모두 지워지고 입력창에 포커스가 이동합니다. 실행 중인 타이머도 취소하세요.
5. 컴포넌트가 화면에서 제거될 때 남은 타이머를 정리하세요.
 */
import { useState, useRef, useEffect } from 'react';

export default function UseRef() {
  // TODO: 입력 내용, 저장된 내용, 저장 완료 메시지를 위한 state 선언
  const [value, setValue] = useState('');
  const [saveValue, setSaveValue] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // TODO: 입력창 DOM과 타이머 ID를 보관할 ref 선언
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // TODO: 컴포넌트가 제거될 때 타이머 정리
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  function handleFocus() {
    // TODO: 입력창에 포커스 이동
    inputRef.current.focus();
  }

  function handleSave() {
    // TODO: 현재 입력 내용 저장
    setSaveValue(value);
    // TODO: 저장 완료 메시지 표시
    setIsSaved(true);
    // TODO: 이전 타이머 취소
    clearTimeout(timerRef.current);
    // TODO: 2초 뒤 메시지를 숨기는 타이머를 만들고 ID 보관
    timerRef.current = setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  }

  function handleReset() {
    // TODO: 타이머 취소
    clearTimeout(timerRef.current);
    // TODO: 입력 내용, 저장 내용, 메시지 초기화
    setValue('');
    setSaveValue('');
    setIsSaved(false);
    // TODO: 입력창에 포커스 이동
    inputRef.current.focus();
  }

  return (
    <section>
      <h1>메모장</h1>

      {/* TODO: ref, 입력값, 입력 변경 이벤트 연결 */}
      <input
        aria-label="메모"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* TODO: 각 버튼에 클릭 이벤트 연결 */}
      <button onClick={handleFocus}>입력하기</button>
      <button onClick={handleSave}>저장</button>
      <button onClick={handleReset}>초기화</button>

      {/* TODO: 저장 완료 메시지를 조건부로 표시 */}
      {isSaved && <p role="status">저장 완료</p>}

      {/* TODO: 저장된 메모 표시 */}
      <p>저장된 메모: {saveValue}</p>
    </section>
  );
}
