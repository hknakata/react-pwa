/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import PropTypes from 'prop-types';

interface ScreenWakeLockProps {
  onError?: (error: unknown) => void;
  onRelease?: () => void;
  children?: React.ReactNode;
}

const ScreenWakeLock: React.FC<ScreenWakeLockProps> = ({ onError, onRelease, children }) => {
  useEffect(() => {
    let wakeLock: any = null;

    const acquireWakeLock = async () => {
      try {
        wakeLock = await (navigator as any).wakeLock.request('screen');
        console.log('Screen wake lock is active.');

        wakeLock.addEventListener('release', () => {
          if (onRelease) {
            onRelease();
          }
        });
      } catch (error) {
        if (onError) {
          onError(error);
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState == 'visible') {
        reacquireWakeLock();
      }
    };

    const reacquireWakeLock = async () => {
      if (wakeLock) {
        wakeLock.release();
      }

      await acquireWakeLock();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    acquireWakeLock();

    return () => {
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, [onError, onRelease]);

  return <>{children}</>;
};

ScreenWakeLock.propTypes = {
  onError: PropTypes.func,
  onRelease: PropTypes.func,
  children: PropTypes.node,
};

export default ScreenWakeLock;
