import styles from './container.module.scss';
import React, { ReactNode } from 'react';
interface ContainerProps {
  children: ReactNode;
  className?: string;
}
export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};
