import { CSSProperties, ReactNode } from 'react';
import classes from '../../util/classes';
import styles from './Button.module.scss';

export function Button({
  outlined,

  className,
  style,
  children,

  ...others
}: {
  outlined?: boolean;

  className?: string;
  style?: CSSProperties;
  children?: ReactNode;

  [x: string]: any;
}) {
  return (
    <a
      className={classes(
        styles.button,
        outlined ? styles.outlined : styles.filled,
        className
      )}
      style={{
        ...style,
      }}
      {...others}
    >
      {children}
    </a>
  );
}
