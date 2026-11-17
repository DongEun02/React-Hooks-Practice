/**
 * 요구사항
- 입력값은 별도 useState 없이 FormData에서 읽으세요.
- 닉네임의 앞뒤 공백을 제거하고, 2글자 미만이면 API를 호출하지 않고 오류를 반환하세요.
- 제공된 registerNickname()으로 등록을 요청하세요.
- 성공 또는 실패 메시지를 Action의 반환값으로 관리하세요.
- 처리 중에는 제출 버튼을 비활성화하고 “등록 중…”을 표시하세요.
- 아래 상태 형태를 모든 반환 경로에서 유지하세요.
 */

import { useActionState } from 'react';

// api.js
export async function registerNickname(nickname) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (nickname === 'admin') {
    return {
      ok: false,
      message: '이미 사용 중인 닉네임입니다.',
    };
  }

  return {
    ok: true,
    message: `${nickname}님, 등록되었습니다.`,
  };
}

async function register(_previousValue, formData) {
  const data = formData.get('nickname').trim();

  if (data.length < 2) {
    return { status: 'error', message: '닉네임은 2글자 이상입니다.' };
  }

  const result = await registerNickname(data);

  if (!result.ok) {
    return { status: 'error', message: result.message };
  }

  return { status: 'success', message: result.message };
}

const initialState = {
  status: 'idle',
  message: '',
};

export default function NicknameForm() {
  const [state, formAction, isPending] = useActionState(register, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="nickname">닉네임</label>

      <input id="nickname" type="text" name="nickname" />

      <button type="submit" disabled={isPending}>
        {isPending ? '등록 중…' : '등록'}
      </button>

      <p role="status">{state.message}</p>
    </form>
  );
}
