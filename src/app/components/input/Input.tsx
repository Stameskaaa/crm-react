import React from 'react';
import styles from './input.module.scss';
import { useAppSelector } from '../../../hooks/reduxHooks';
interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Input: React.FC<Props> = ({ setValue, value }) => {
  const { currentLanguageObject } = useAppSelector((state) => state.language);
  return (
    <div className={styles.input_container}>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type="text"
        placeholder={`${currentLanguageObject.enterKey}...`}
      />
    </div>
  );
};
