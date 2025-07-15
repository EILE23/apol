// auth.ts

const TOKEN_KEY = "admin_token";
const TOKEN_EXPIRE_KEY = "admin_token_expire";
const TOKEN_EXPIRE_MS = 2 * 60 * 60 * 1000; // 2시간

// 로그인 시 토큰과 만료시간 저장
export function loginAsAdmin() {
  const token = Math.random().toString(36).slice(2); // 간단 랜덤 토큰
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(
    TOKEN_EXPIRE_KEY,
    (Date.now() + TOKEN_EXPIRE_MS).toString()
  );
}

// 로그아웃 시 토큰/만료시간 삭제
export function logoutAdmin() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRE_KEY);
}

// 관리자 여부 확인 (토큰 존재 + 만료시간 체크)
export function isAdminLoggedIn() {
  const token = localStorage.getItem(TOKEN_KEY);
  const expire = localStorage.getItem(TOKEN_EXPIRE_KEY);
  if (!token || !expire) return false;
  if (Date.now() > Number(expire)) {
    logoutAdmin();
    return false;
  }
  return true;
}

// 남은 시간(초)
export function getAdminTokenRemainingSeconds() {
  const expire = localStorage.getItem(TOKEN_EXPIRE_KEY);
  if (!expire) return 0;
  return Math.max(0, Math.floor((Number(expire) - Date.now()) / 1000));
}
