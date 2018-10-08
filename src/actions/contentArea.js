const { ipcRenderer } = window.require('electron')

export const getQuestionData = (data) => ({
    type: "GET_QUESTIONS",
    data
})

export const activeCourse = (datas) => ({
    type: "SELECTED_COURSE",
    datas
})

// export const addVideos = videos => dispatch => {
//     ipcRenderer.send('videos:added', videos);
//     ipcRenderer.on('metadata:complete', (event, videosWithData) => {
//       dispatch({ type: ADD_VIDEOS, payload: videosWithData });
//     });
//   };






// // let datas = "asdaddada"
// export const getFilterData = data => {
//         ipcRenderer.send("filter:send", data);
// }           


// // export const getElectronData = () => {
// ipcRenderer.on("filterData:Received", (event, filterData) => {
//     console.log(filterData)
// });


export const addFilterData = (datas) => ({
    type: "ADD_FILTER_QUESTION",
    datas
})

//     console.log("ffdjdfkjjkdjkdjdjkd")
//     console.log(filterData)
//     return (dispatch) => {
//         dispatch(addFilterData(filterData))
//     }
//   }) 

