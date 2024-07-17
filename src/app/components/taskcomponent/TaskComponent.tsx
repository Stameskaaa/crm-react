import { useAppSelector } from '../../../hooks/reduxHooks';
import styles from './taskcomponent.module.scss';

interface Props {
  name: string;
  src: string;
  date: string;
  count: number;
}

export const TaskComponent: React.FC<Props> = ({ name, src, date, count }) => {
  const { currentLanguageObject } = useAppSelector((state) => state.language);
  return (
    <div className={styles.container}>
      <div className={styles.designer_info}>
        <img src={src} alt="error" />
        <p>{name}</p>
      </div>
      <div className={styles.designer_footerinfo}>
        <p>
          {currentLanguageObject.projectDone}: {count}
        </p>
        <p>
          {currentLanguageObject.timeWasted}: {date} {currentLanguageObject.h}.
        </p>
      </div>
      <hr />
    </div>
  );
};
