import { atom, useRecoilState } from 'recoil';

import { openDB } from 'idb';

import { Themes } from '@/theme/types';

import type { Actions } from './types';

// create database and object store
const dbPromise = openDB('reactPwaCore', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('settings')) {
      db.createObjectStore('settings');
    }
  },
});

const themeModeState = atom<Themes>({
  key: 'theme-mode-state',
  default: 'dark' as Themes,
  effects_UNSTABLE: [synchronizeWithIndexedDB as any],
});

async function synchronizeWithIndexedDB({
  setSelf,
  onSet,
}: {
  setSelf: (value: Themes) => void;
  onSet: (callback: (value: Themes) => void) => void;
}) {
  const db = await dbPromise;
  const storedTheme = await db.get('settings', 'theme-mode');
  storedTheme && setSelf(storedTheme);
  onSet((value) => {
    (async () => {
      await db.put('settings', value, 'theme-mode');
    })();
  });
}

function useTheme(): [Themes, Actions] {
  const [themeMode, setThemeMode] = useRecoilState(themeModeState);

  function toggle() {
    setThemeMode((mode: Themes) => (mode === Themes.DARK ? Themes.LIGHT : Themes.DARK));
  }

  return [themeMode, { toggle }];
}

export default useTheme;
