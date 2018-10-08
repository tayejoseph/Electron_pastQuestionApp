const electron = require("electron");
const {app, BrowserWindow, ipcMain} = electron;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let otherWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

let filterContent = "";
ipcMain.on("filter:send", (event, data) => {
  otherWindow = new BrowserWindow({
      title: `filter ${data.activeCourseName} question`,
      parent: mainWindow,
      modal: true
    });
  otherWindow.loadURL(`http://localhost:3000/filterPage`)    
  otherWindow.on("closed", () => otherWindow = null) 
  console.log(data)
  filterContent = data
})

if (filterContent !== "") {
  console.log("11111")
  otherWindow.webContents.send("filterData:Received", filterContent)
}
