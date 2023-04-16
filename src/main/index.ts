import { app, BrowserWindow, shell } from 'electron';
import { release } from 'os';
import { join } from 'path';
import * as os from 'os';

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    width: 1024,
    height: 768,
    kiosk: process.env.NODE_ENV !== 'development' && os.platform() === 'linux',
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      webviewTag: true,
      zoomFactor: 1.15,
    },
  });

  // XXX: 用 isPackaged 判断是否生产环境大概不太对，应该用环境变量的。因为 Arch System Electron 的情况 isPackaged = false
  if (process.env.NODE_ENV !== 'development') {
    win.loadURL('file://' + join(__dirname, '../renderer/index.html') + '#/kiosk/');
  }
  else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://[${process.env['VITE_DEV_SERVER_HOST']}]:${process.env['VITE_DEV_SERVER_PORT']}/#/kiosk/`;
    win.loadURL(url);
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });

  // win.webContents.toggleDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  win = null;
  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  }
  else {
    createWindow();
  }
});
