import React, { useEffect, useState } from 'react';
import styles from './commentcomponent.module.scss';
import { useAppSelector } from '../../../hooks/reduxHooks';

interface Props {
  src: string;
  name: string;
  date: string;
  message: string;
  issue: string;
}

export const CommentComponent: React.FC<Props> = ({ src, name, date, message, issue }) => {
  const { currentLanguageObject, currentLanguage } = useAppSelector((state) => state.language);
  const [relativeData, setRelativeData] = useState<string | null>(null);

  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} ${currentLanguageObject.day} ${currentLanguageObject.ago}`;
    if (hours > 0) return `${hours} ${currentLanguageObject.hour} ${currentLanguageObject.ago}`;
    if (minutes > 0)
      return `${minutes} ${currentLanguageObject.minute} ${currentLanguageObject.ago}`;
    return `${seconds} ${currentLanguageObject.second} ${currentLanguageObject.ago}`;
  };

  useEffect(() => {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      const relativeData = getRelativeTime(parsedDate);
      setRelativeData(relativeData);
    } else {
      console.error('Invalid date format:', date);
    }
  }, [date, currentLanguage]);

  return (
    <div className={styles.designer}>
      <div className={styles.designer_info}>
        <img src={src} alt="error" />
        <p>{name}</p>
      </div>
      <div>
        <p className={styles.designer_message}>{message}</p>
      </div>
      <div className={styles.designer_footerinfo}>
        <p>{issue}</p>
        <p>{relativeData}</p>
      </div>
      <hr />
    </div>
  );
};
