import { CSSProperties, PropsWithChildren } from 'react';
import classes from '../../util/classes';
import styles from './Column.module.scss';

export function Column(
  props: PropsWithChildren<{
    gap?: number | string;
    centerX?: boolean;

    className?: string;
    style?: CSSProperties;
  }>
) {
  return (
    <div
      className={classes(styles.flexCol, props.className)}
      style={{
        gap: props.gap,
        alignItems: props.centerX ? 'center' : undefined,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
