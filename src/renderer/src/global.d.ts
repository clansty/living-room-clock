
export { }

declare global {
  interface Window {
    // Expose some Api through preload script
    mqtt: import('mqtt').MqttClient
    ipcRenderer: import('electron').IpcRenderer
  }
}
