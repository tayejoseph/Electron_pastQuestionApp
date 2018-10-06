// import { ipcRenderer } from "electron";
// console.log(ipcRenderer)
export const getQuestionData = (data) => ({
    type: "GET_QUESTIONS",
    data
})

export const activeCourse = (datas) => ({
    type: "SELECTED_COURSE",
    datas
})

export const addFilterData = (data) => {
    return (dispatch) => {
        // ipcRenderer.send("filter:on", data.activeCourseName)
            dispatch({
                type: "ADD_FILTER_QUESTION",
                data
            })
        
    }
}
export const addfilterData = (data) => ({
    type: "ADD_FILTER_QUESTION",
    data
})