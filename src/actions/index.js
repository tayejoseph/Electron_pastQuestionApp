
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

export const addActiveCourseYears = (data) => ({
    type: "ADD_ACTIVE_COURSE_YEARS",
    data
})

export const addActivePastQuestionData = (data) => ({
    type: "ADD_ACTIVE_PASTQUESTION",
    data
})

export const addActiveCourseTopics = (data) => ({
    type: "ADD_ACTIVE_COURSE_TOPICS",
    data
})

//this is used to add the filteredData to the page
export const addFilteredData = (data) => ({
    type: "ADD_FILTERED_DATAS",
    data
})
