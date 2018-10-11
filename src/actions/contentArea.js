const { ipcRenderer } = window.require('electron')

export const getQuestionData = (data) => ({
    type: "GET_QUESTIONS",
    data
})

export const activeCourse = (datas) => ({
    type: "SELECTED_COURSE",
    datas
})

export const addAnswersData = (data) => ({
    type: "ADD_ANSWER_DATA",
    data
})

// export const sendFilterData_ipc = (data) => {
//     ipcRenderer.send("filterData:send", data)
// }

export const openFilterWindow = (data) => {
    ipcRenderer.send("filter:send", data)
}




export const clearFilteredQuestion = (data) => ({
    type: "CLEAR_FILTER_QUESTION"
})

export const addFilterData = (datas) => ({
    type: "ADD_FILTER_QUESTION",
    datas
})


export const addFilteredData = datas => ({
    type: "ADD_FILTERED_QUESTIONS",
    datas
})
 

export const addfilterData_ipc = (data) => {
ipcRenderer.send("filteredData:send", data)
}

// export const convertVideos = videos => dispatch => {
//     ipcRenderer.send('conversion:start', videos);
  
//     ipcRenderer.on('conversion:end', (event, { video, outputPath }) => {
//       dispatch({ type: VIDEO_COMPLETE, payload: { ...video, outputPath } });
//     });
// export const receiveFilterData_ipc = () => {
// let filteredData;
// ipcRenderer.on("filteredData:received", (event, data) => {
//     filteredData = data
// });

// if(filteredData) {
//     console.log("sdsff")
//     addFilteredData(filteredData)
// }

// )
// }

