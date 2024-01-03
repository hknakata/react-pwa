import { atom, useRecoilState } from 'recoil';

import { Themes } from '@/theme/types';

import type { AtomEffectParams } from '../types';
import type { Actions } from './types';

const themeModeState = atom({
  key: 'theme-mode-state',
  default: 'dark' as Themes,
  effects: [synchronizeWithSessionStorage],
});

function synchronizeWithSessionStorage({ setSelf, onSet }: AtomEffectParams) {
  const storedTheme = sessionStorage.getItem('theme-mode');
  storedTheme && setSelf(storedTheme);
  onSet((value: Themes) => sessionStorage.setItem('theme-mode', value));
}

function useTheme(): [Themes, Actions] {
  const [themeMode, setThemeMode] = useRecoilState(themeModeState);

  function toggle() {
    setThemeMode((mode: Themes) => (mode === Themes.DARK ? Themes.LIGHT : Themes.DARK));
  }

  return [themeMode, { toggle }];
}

export default useTheme;
