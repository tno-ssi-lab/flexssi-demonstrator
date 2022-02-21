import React, { PropsWithChildren } from 'react';
import { KEYCODES } from './keycodes';

export function KeyboardButton(
  props: PropsWithChildren<{ onTrigger: () => void }>
) {
  return (
    <button
      onClick={props.onTrigger}
      onKeyDown={(e) => {
        if (e.keyCode == KEYCODES.enter) {
          e.preventDefault();
          props.onTrigger();
        }
      }}
    >
      {props.children}
    </button>
  );
}
