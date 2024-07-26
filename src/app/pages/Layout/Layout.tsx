import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { Header } from '../../components/header/Header';
import styles from './layout.module.scss';
import { Outlet } from 'react-router-dom';
import { changeLanguage } from '../../../features/slice/languagesSlice';

export const Layout = () => {
  const { currentLanguage } = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('language')) {
      if (localStorage.getItem('language') !== currentLanguage) {
        dispatch(changeLanguage());
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  );
};
