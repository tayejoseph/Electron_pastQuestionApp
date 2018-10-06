const questionData = "";


export const questionReducer = (state = questionData, action) => {
    switch(action.type) {
        case "GET_QUESTIONS":
            return action.data
        default: 
            return state;
    }
}


const activeQuestion = {
    activeQuestionData: {},
    activeCourseData: []
}
export const selectedCourseReducer = (state = activeQuestion, action) => {
    switch(action.type) {
        case "SELECTED_COURSE":
            return {
                activeQuestionData: action.datas.activeQuestionData,
                activeCourseData: action.datas.activeCourseData
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
            return {
                filterDatas : action.data,
                filteredData: []
            }
        default: 
            return state;
    }
}