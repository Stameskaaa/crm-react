import { useEffect, useLayoutEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as string;
    } else {
      return 'light';
    }
  });

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return {
    theme,
    setTheme,
  };
};
