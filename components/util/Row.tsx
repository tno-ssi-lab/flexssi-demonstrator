import { CSSProperties, PropsWithChildren } from 'react';
import classes from '../../util/classes';
import styles from './Row.module.scss';

export function Row(
  props: PropsWithChildren<{
    gap?: number | string;
    centerY?: boolean;
    centerX?: boolean;

    className?: string;
    style?: CSSProperties;
  }>
) {
  return (
    <div
      className={classes(styles.flexRow, props.className)}
      style={{
        gap: props.gap ?? 10,
        alignItems: props.centerY ? 'center' : undefined,
        justifyContent: props.centerX ? 'center' : undefined,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
