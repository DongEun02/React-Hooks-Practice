import { useLayoutEffect, useRef, useState } from 'react';
import { usePreservedCallback } from 'react-simplikit';

export function PreservedCallbackRepro() {
  const [value, setValue] = useState('abcd');
  const triggered = useRef(false);

  const onChange = usePreservedCallback((nextValue: string) => {
    console.log('onChange', { nextValue, previousValue: value });
    setValue(nextValue.length > 5 ? value : nextValue);
  });

  useLayoutEffect(
    function triggerBeforeCallbackSync() {
      if (value !== 'abcde' || triggered.current) return;

      triggered.current = true;
      console.log('layout effect', { currentValue: value });
      onChange('abcdef');
    },
    [value, onChange]
  );

  return (
    <input
      aria-label="재현 입력창"
      value={value}
      onChange={event => onChange(event.target.value)}
    />
  );
}
