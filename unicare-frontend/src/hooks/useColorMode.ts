import { setColorMode } from '@/state/app';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useColorMode = () => {
  const colorMode =	useSelector((state: any) => state.app.colorMode)

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    colorMode === 'dark'
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
