import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import ScreenWakeLock from '@/sections/ScreenWakeLock';
import Sidebar from '@/sections/Sidebar';

function App() {
  const handleScreenWakeLockError = (error: unknown) => {
    console.error('Unable to acquire screen wake lock:', error);
  };

  const handleScreenWakeLockRelease = () => {
    console.log('Screen wake lock released.');
  };

  return (
    <Fragment>
      <CssBaseline />
      <Notifications />
      <HotKeys />
      <SW />
      <ScreenWakeLock onError={handleScreenWakeLockError} onRelease={handleScreenWakeLockRelease} />
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Pages />
      </BrowserRouter>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
