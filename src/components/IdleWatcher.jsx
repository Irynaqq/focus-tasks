import { useIdleTimer } from "react-idle-timer";

export default function IdleWatcher({ focusMode, onIdle, onActive }) {
  useIdleTimer({
    timeout: focusMode ? 30_000 : 60_000, // 30с в фокусе, иначе 60с
    throttle: 500,
    onIdle,
    onActive,
  });

  return null;
}
