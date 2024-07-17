import { NavLink, useLocation } from 'react-router-dom';
import styles from './header.module.scss';
import { useEffect, useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { Switch } from '../switchbutton/SwitchButton';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { changeLanguage } from '../../../features/slice/languagesSlice';
function getWorkingWeekNumber(date: Date): number {
  const offsetDate = new Date(date.getTime() + 11 * 60 * 60 * 1000);
  const startOfYear = new Date(offsetDate.getFullYear(), 0, 1);
  const startDayOfWeek = startOfYear.getDay() || 7;
  const dayOfYear =
    Math.floor((offsetDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)) + 1;
  const calendarWeekNumber = Math.ceil((dayOfYear + startDayOfWeek - 1) / 7);
  return calendarWeekNumber - 1;
}

const paths = ['Main', 'Tasks', 'Design'];

export const Header = () => {
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState<number | undefined>(undefined);
  const { setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const { currentLanguage, currentLanguageObject } = useAppSelector((state) => state.language);
  const headers = [
    currentLanguageObject.main,
    currentLanguageObject.task,
    currentLanguageObject.design,
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    paths.forEach((path, index) => {
      location.pathname.includes(`${path.toLowerCase()}`) ? setActiveIndex(index) : null;
    });
  }, [location.pathname]);
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = getWorkingWeekNumber(today);
    setCurrentDayOfWeek(dayOfWeek);
  }, []);

  const SwitchTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    setIsChecked((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {paths.map((path, index) => {
          return (
            <NavLink
              key={index}
              to={`/${path.toLowerCase()}`}
              className={`${activeIndex === index ? styles.active : null}`}>
              {headers[index]}
            </NavLink>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <div
          onClick={() => dispatch(changeLanguage())}
          style={{ cursor: 'pointer', userSelect: 'none' }}>
          {currentLanguage.toLocaleUpperCase()}
        </div>
        <Switch isChecked={isChecked} onChange={() => SwitchTheme()} />

        <div>{currentDayOfWeek}</div>
      </div>
    </div>
  );
};
