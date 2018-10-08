// const questionData = "";


// export const questionReducer = (state = questionData, action) => {
//     switch(action.type) {
//         case "GET_QUESTIONS":
//             return action.data
//         default: 
//             return state;
//     }
// }


const activeQuestion = {
    activeQuestionData: {},
    activeCourseData: [],
    uni_info: {}
}
export const selectedCourseReducer = (state = activeQuestion, action) => {
    switch(action.type) {
        case "SELECTED_COURSE":
        console.log(action.datas)
            return {
                activeQuestionData: action.datas.activeQuestionData,
                activeCourseData: action.datas.activeCourseData,
                uni_info: action.datas.uni_info
            }
        default: 
            return state;
    }
}

// export const selectedCourseReducer = (state = questionData, action) => {
//     switch(action.type) {
//         case "SELECTED_COURSE":
//             return action.data
//         default: 
//             return state;
//     }
// }


const defaultFilter = {
    filterDatas: {},
    filteredData: []
}
export const filterQuestions = (state = defaultFilter, action) => {
    switch(action.type) {
        case "ADD_FILTER_QUESTION":
        console.log(action)
        console.log(action.datas)
            return {
                filterDatas : action.datas,
                filteredData: []
            }
        default: 
            return state;
    }
}