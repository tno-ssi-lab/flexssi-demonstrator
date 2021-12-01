import { CSSProperties, ReactNode } from 'react';
import classes from '../../util/classes';
import styles from './Button.module.scss';

export function Button(props: {
  outlined?: boolean;

  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <a
      className={classes(
        styles.button,
        props.outlined ? styles.outlined : styles.filled,
        props.className
      )}
      style={{
        ...props.style,
      }}
    >
      {props.children}
    </a>
  );
}
