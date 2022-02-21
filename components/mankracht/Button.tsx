import { CSSProperties, ReactNode } from 'react';
import { KEYCODES } from 'util/keycodes';
import classes from '../../util/classes';
import styles from './Button.module.scss';

export function Button({
  outlined,
  disabled,

  onTrigger,

  className,
  style,
  children,

  ...others
}: {
  outlined?: boolean;
  disabled?: boolean;

  onTrigger?: () => void; // both click and keyboard enter

  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  return (
    <a
      className={classes(
        styles.button,
        outlined ? styles.outlined : styles.filled,
        disabled ? styles.disabled : undefined,
        className
      )}
      onClick={onTrigger}
      onKeyDown={
        onTrigger
          ? (e) => {
              if (e.keyCode == KEYCODES.enter) {
                e.preventDefault();
                onTrigger();
              }
            }
          : undefined
      }
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
