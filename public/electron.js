const electron = require("electron");
const {app, BrowserWindow, ipcMain} = electron;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

// let AnswerWindow;
// let FilterWindow;
// let UploadWindow;
// let DownloadWindow;
// let FeedBackWindow;



app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

mainWindow.on("closed", () => (mainWindow = null));


// AnswerWindow = new BrowserWindow ({
//     title: "View Answers",
//     parent: mainWindow,
//     minimizable: false,
//     maximizable: false,
//     show: false,
//     modal: true
// });
// AnswerWindow.loadURL(`file://${__dirname}/answerPage.html`);
// // AnswerWindow.setMenu(null)

// ipcMain.on("answer:datas", (event, data) => {
//   console.log(data)
// AnswerWindow.webContents.send("answer:datas", data)
// })

// ipcMain.on("answerWindow:open", (event) => {
//   AnswerWindow.show()
// })

// AnswerWindow.on("close", (event) => {
//   event.preventDefault();
//   AnswerWindow.hide()
// })

// ipcMain.on("close", (event) => AnswerWindow.close())



// FilterWindow = new BrowserWindow ({
//   parent: mainWindow,
//   minimizable: false,
//   maximizable: false,
//   show: false,
//   modal: true
// });

// FilterWindow.loadURL(`file://${__dirname}/filterPage.html`)
// FilterWindow.setMenu(null)

// ipcMain.on("filter:datas", (event, data) => {
// console.log(data)
// FilterWindow.setTitle(`filter ${data.activeCourseName} question`)
// FilterWindow.webContents.send("filter:datas", data)
// })

// ipcMain.on("filterWindow:open", (events, data) => {
// FilterWindow.show();
// })

// ipcMain.on("close:window", () => {
//   FilterWindow.close()
// })

// FilterWindow.on("close", (event) => {
//   event.preventDefault()
//   FilterWindow.hide()
// })

// ipcMain.on("filtered:questions", (event, data) => {
//   console.log(data)
// mainWindow.webContents.send("filtered:Datas", data)
// })


// UploadWindow = new BrowserWindow ({
//     title: "Upload Questions",
//     parent: mainWindow,
//     minimizable: false,
//     maximizable: false,
//     show: false,
//     modal: true
// });
// UploadWindow.loadURL(`file://${__dirname}/uploadPage.html`);
// // UploadWindow.setMenu(null)

// ipcMain.on("UploadWindow:open", (event) => {
//   UploadWindow.show()
// })

// ipcMain.on("upload:image", (event, data) => {
//   console.log(data)
// })

// ipcMain.on("close:uploadWindow", () => UploadWindow.close())

// UploadWindow.on("close", (event) => {
//   event.preventDefault();
//   UploadWindow.hide()
// })


// DownloadWindow = new BrowserWindow ({
//     title: "Download Questions",
//     parent: mainWindow,
//     minimizable: false,
//     maximizable: false,
//     show: false,
//     modal: true
// });
// DownloadWindow.loadURL(`file://${__dirname}/downloadPage.html`);
// // UploadWindow.setMenu(null)

// ipcMain.on("DownloadWindow:open", (event) => {
//   DownloadWindow.show()
// })

// ipcMain.on("close:DownloadWindow", () => DownloadWindow.close())

// DownloadWindow.on("close", (event) => {
//   event.preventDefault();
//   DownloadWindow.hide()
// })


// FeedBackWindow = new BrowserWindow ({
//     title: "FeedBack Section",
//     parent: mainWindow,
//     minimizable: false,
//     maximizable: false,
//     show: false,
//     modal: true
// });
// FeedBackWindow.loadURL(`file://${__dirname}/feedBackPage.html`);
// // UploadWindow.setMenu(null)

// ipcMain.on("FeedBackWindow:open", (event) => {
//   FeedBackWindow.show()
// })

// ipcMain.on("close:FeedBackWindow", () => FeedBackWindow.close())

// FeedBackWindow.on("close", (event) => {
//   event.preventDefault();
//   FeedBackWindow.hide()
// })




})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});



















