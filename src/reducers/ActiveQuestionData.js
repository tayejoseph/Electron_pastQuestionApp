
const activeData = {
    currentQuestionData: {},
    activeCourseDatas: { //this is my new state for my filter data so that the user can filter data from the entire course datas
        activeCourseTopics: [],
        activeCourseYears: [],
        activeCourseData: {}
    },
    uni_info: {}
}

export default (state = activeData, action) => {
    switch (action.type) {
        case "ADD_UNI_INFO":
            return {
                ...state,
                uni_info : action.data 
            }
        case "ADD_COURSE_DATA":
            return {
                ...state,
                activeCourseDatas: {
                    ...state.activeCourseDatas,
                    activeCourseData: action.data
                }
            }
        case "ADD_ACTIVE_PASTQUESTION":
            return {
                ...state,
                currentQuestionData: action.data
            }
        case "ADD_ACTIVE_COURSE_TOPICS":
            return {
                ...state,
                activeCourseDatas: {
                    ...state.activeCourseDatas,
                    activeCourseTopics: action.data
                }
            }
        case "ADD_ACTIVE_COURSE_YEARS":
        console.log(action.data)
            return {
                ...state,
                activeCourseDatas: {
                    ...state.activeCourseDatas,
                    activeCourseYears: action.data
                }
            }
        default:
            return state
    }
}