import React, { useCallback, useRef, useState } from "react";

type Callback = () => void;

interface LongPressOptions {
  delay?: number;
}

const useLongPress = (
  onLongPress: Callback,
  onClick?: Callback,
  { delay = 500 }: LongPressOptions = {}
) => {
  const timeoutRef = useRef<number | null>(null);
  const [longPressTriggered, setLongPressTriggered] = useState(false);

  const start = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.persist && event.persist(); // SyntheticEvent 재활용 방지
      setLongPressTriggered(false);
      timeoutRef.current = window.setTimeout(() => {
        onLongPress();
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay]
  );

  const clear = useCallback(
    (event: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (shouldTriggerClick && !longPressTriggered && onClick) {
        onClick();
      }
    },
    [longPressTriggered, onClick]
  );

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false), // 버튼 영역을 벗어나면 롱프레스 취소
    onTouchEnd: (e: React.TouchEvent) => clear(e),
  };
};

export default useLongPress;
