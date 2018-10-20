
//ACTIVE PAST QUESTION DATA
export const getPastQuestionApi = (data) => ({
    type: "INITIALISE_APPSTATE",
    data
})

export const addUni_info = (data) => ({
    type: "ADD_UNI_INFO",
    data
})

export const addActiveCourseData = (data) => ({
    type: "ADD_COURSE_DATA",
    data
})

export const addActivePastQuestion = (data) => ({
    type: "ADD_ACTIVE_PASTQUESTION",
    data
})

export const addActiveCourseTopics = (data) => ({
    type: "ADD_ACTIVE_COURSE_TOPICS",
    data
})

export const addActiveCoureYears = (data) => ({
    type: "ADD_ACTIVE_COURSE_YEARS",
    data
})