import { Header } from '../../components/header/Header';
import styles from './layout.module.scss';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  );
};
