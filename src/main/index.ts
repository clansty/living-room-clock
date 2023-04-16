import { app } from 'electron';
import createMainWindow from './createMainWindow';
import initScreenSaver from './initScreenSaver';

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

app.on('ready', () => {
  createMainWindow();
  initScreenSaver();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
