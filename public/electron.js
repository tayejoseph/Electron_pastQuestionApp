const electron = require("electron");
const {app, BrowserWindow, ipcMain} = electron;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let subWindow;

console.log(mainWindow)

if (isDev) {
  installExtension = require("electron-devtools-installer");
}

const installExtensions = () => {
  installExtension["default"](installExtension["REDUX_DEVTOOLS"])
  installExtension["default"](installExtension["REACT_DEVELOPER_TOOLS"])
}

if (isDev) installExtensions()


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




const filterSubWindow = (data) => {
  subWindow = new BrowserWindow({
    title: `filter ${data.activeCourseName} question`,
    parent: mainWindow
    // ,
    // modal: true
  });

subWindow.loadURL(`http://localhost:3000/filterPage`);  
subWindow.on("closed", () => subWindow = null) 
}

ipcMain.on("filter:open", (events, data) => {
  filterSubWindow(data);
    ipcMain.on("sync:datas", (event) => {
      event.sender.send("filter:data", data)
    }
)})

ipcMain.on("filteredData:send", (event, data) => {
  subWindow.close();
  mainWindow.webContents.send("filteredData:received", data)
})

ipcMain.on("close:window", () => subWindow.close())



//U NEED TO CREATE ONLY ONE FUNC THAT CREATES A SUB WINDOW

const answerSubWindow = (data) => {
  subWindow = new BrowserWindow ({
    title: "view Answers",
    parent: mainWindow
 });
//  subWindow.loadURL(`file://${__dirname}/answerPage.html`)
 subWindow.loadURL(`http://localhost:3000/filterPage`)
} 

ipcMain.on("answer:open", (event, data) => {
  console.log(data)
  answerSubWindow(data)
  ipcMain.on("sync:answer", (event) => {
      event.sender.send(data)
  })
  
})
















