import { BrowserWindow, shell } from 'electron';
import os from 'os';
import { join } from 'path';
import { spawn } from 'child_process';
import { streamToBuffer } from './utils/streamToBuffer';

let win: BrowserWindow | null;
let timer: NodeJS.Timer;

export default () => {
  if (timer) return;
  timer = setInterval(timerFunction, 1000);
  createWindow();
}

const createWindow = () => {
  if (win && !win.isDestroyed()) return;

  win = new BrowserWindow({
    title: 'ScreenSaver',
    width: 1920,
    height: 1080,
    alwaysOnTop: true,
    fullscreen: process.env.NODE_ENV !== 'development' && os.platform() === 'linux',
  });

  // XXX: 用 isPackaged 判断是否生产环境大概不太对，应该用环境变量的。因为 Arch System Electron 的情况 isPackaged = false
  if (process.env.NODE_ENV !== 'development') {
    win.loadURL('file://' + join(__dirname, '../renderer/index.html') + '#/screensaver');
  }
  else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}/#/screensaver`;
    win.loadURL(url);
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });

  win.on('close', () => {
    win!.destroy();
    win = null;
  });
};

const timerFunction = async () => {
  if (os.platform() !== 'linux') return;
  const process = spawn('xprintidle');
  const idleMs = (await streamToBuffer(process.stdout)).toString('utf-8').trim();
  if (Number(idleMs) < 1000 * 60 * 5) return;
  createWindow();
};
