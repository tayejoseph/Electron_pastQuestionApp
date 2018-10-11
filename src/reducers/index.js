
const activeQuestion = {
    activeQuestionData: {},
    activeCourseData: [],
    uni_info: {},
    answersData: [] //this take the anwers that will be shown in the answer page
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
        case "ADD_ANSWER_DATA":
        return {
            ...state,
            answersData: action.data
        }
        default: 
            return state;
    }
}



const defaultFilter = {
    filterDatas: {},
    filteredData:"", //this default supposed to be an empty object
}
export const filterQuestions = (state = defaultFilter, action) => {
    switch(action.type) {
        case "ADD_FILTER_QUESTION":
        console.log(action)
        console.log(action.datas)
            return {
                ...state,
                filterDatas : action.datas,
            }
        case "ADD_FILTERED_QUESTIONS":
        console.log(action.datas)
            return {
                ...state,
                filteredData: action.datas        
            }
        case "CLEAR_FILTER_QUESTION": 
            console.log("cleared")
            return {
                ...state,
                filteredData: ""
            }
        default: 
            return state;
    }
}