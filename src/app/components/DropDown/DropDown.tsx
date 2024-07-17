import React, { useState } from 'react';
import styles from './dropdown.module.scss';
interface DropDownProps {
  onSortChange: (sortOption: string) => void;
  selectedOption: string;
  text: string;
  options: string[];
}

export const DropDown: React.FC<DropDownProps> = ({
  onSortChange,
  selectedOption,
  text,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const closeList = () => {
    if (!timer) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        setTimer(null);
      }, 300);
      setTimer(timer);
    }
  };

  const openList = () => {
    setIsOpen(true);

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  return (
    <label>
      {text}{' '}
      <div
        className={styles.dropdown}
        onMouseEnter={() => openList()}
        onMouseLeave={() => closeList()}>
        <button className={styles.dropdownButton}>{selectedOption} ▼</button>
        {isOpen && (
          <ul className={styles.dropdownMenu}>
            {options.map((option) => (
              <li key={option} className={styles.dropdownItem} onClick={() => onSortChange(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </label>
  );
};
