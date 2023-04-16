import { BrowserWindow, shell } from 'electron';
import os from 'os';
import { join } from 'path';

let win: BrowserWindow;

export default () => {
  if (win && !win.isDestroyed()) return;

  win = new BrowserWindow({
    title: 'Main window',
    width: 1920,
    height: 1080,
    // type: process.env.NODE_ENV !== 'development' && os.platform() === 'linux' ? 'desktop' : undefined,
    fullscreen: process.env.NODE_ENV !== 'development' && os.platform() === 'linux',
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      webviewTag: true,
      zoomFactor: 1.15,
    },
  });

  // XXX: 用 isPackaged 判断是否生产环境大概不太对，应该用环境变量的。因为 Arch System Electron 的情况 isPackaged = false
  if (process.env.NODE_ENV !== 'development') {
    win.loadURL('file://' + join(__dirname, '../renderer/index.html') + '#/kiosk/clanstools');
  }
  else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://[${process.env['VITE_DEV_SERVER_HOST']}]:${process.env['VITE_DEV_SERVER_PORT']}/#/kiosk/clanstools`;
    win.loadURL(url);
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });
}
