import styles from './designcomponent.module.scss';
import { Issues } from '../../../types/types';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
interface Props {
  src: string;
  name: string;
  email: string;
  tasks: Issues[];
}
export const DesignComponent: React.FC<Props> = ({ src, name, email, tasks }) => {
  const [countDoneTasks, setCountDoneTasks] = useState<number>(0);
  const { currentLanguageObject } = useAppSelector((state) => state.language);
  useEffect(() => {
    setCountDoneTasks(tasks.reduce((acc, task) => (task.status === 'Done' ? acc + 1 : acc), 0));
  }, [tasks]);

  return (
    <div className={styles.designer}>
      <div className={styles.designer_info}>
        <img src={src} alt="error" />
        <p>{name}</p>
      </div>
      <div className={styles.designer_dawninfo}>
        <div className={styles.designer_tasks}>
          <p>
            {currentLanguageObject.closedTasks}: {countDoneTasks}
          </p>
          <p>
            {currentLanguageObject.inProcess}: {tasks.length - countDoneTasks}
          </p>
        </div>
        <div className={styles.designer_email}>
          <p>e-mail: {email}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};
