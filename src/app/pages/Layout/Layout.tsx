import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { Header } from '../../components/header/Header';
import styles from './layout.module.scss';
import { Outlet } from 'react-router-dom';
import { changeLanguage, changeTheme } from '../../../features/slice/languagesSlice';

export const Layout = () => {
  const { currentLanguage, theme } = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('language')) {
      if (localStorage.getItem('language') !== currentLanguage) {
        dispatch(changeLanguage());
      }
    }

    if (localStorage.getItem('theme')) {
      dispatch(changeTheme(localStorage.getItem('theme')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    localStorage.setItem('theme', theme);
  }, [currentLanguage, theme]);

  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  );
};
