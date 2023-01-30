import { useEffect, useState } from 'react';
import { ANIMATION_POPUP_TIME } from './const';

export function useMount(opened: boolean) {
  const [mounted, setMounted] = useState(opened);

  useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    }
    if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_POPUP_TIME);
    }
  }, [opened]);

  return { mounted };
}
