import styles from './switch.module.scss';

interface Props {
  onChange: () => void;
  isChecked: boolean;
  className?: string;
}

export const Switch: React.FC<Props> = ({ onChange, isChecked, className }) => {
  return (
    <label className={`${styles.switch} ${className}`}>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span className={styles.slider}></span>
    </label>
  );
};
