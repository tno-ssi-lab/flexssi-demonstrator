import { CSSProperties, ReactNode } from 'react';
import classes from '../../util/classes';
import styles from './Button.module.scss';

export function Button({
  outlined,
  disabled,

  className,
  style,
  children,

  ...others
}: {
  outlined?: boolean;
  disabled?: boolean;

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
        disabled ? styles.disabled : undefined,
        className
      )}
      style={{
        ...style,
      }}
      title={disabled ? 'Niet beschikbaar in dit prototype' : undefined}
      {...others}
    >
      {children}
    </a>
  );
}
