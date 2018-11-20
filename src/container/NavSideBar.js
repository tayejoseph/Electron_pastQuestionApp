import React from "react";
import {connect} from "react-redux";
import {addUni_info, addActiveCourseTopics, addActiveCourseYears, addActiveCourseData, addActivePastQuestionData} from "./../actions";

class NavSideBar extends React.Component {
toggleElementView = (elementId) => { 
    console.log(elementId)
    const container = document.getElementById(elementId)
    console.dir(container)
    if (container.style.display === "none") {
        container.style.display = "block"
    } else {
        container.style.display = "none"
    }
}
addTopic_Years = (course) => {
    const topics = [];
    const pastQuestionYears = [];
    course.past_questions.map((pastQuestions) => {
    pastQuestions.question_datas.map((pastQuestion) => {
        pastQuestionYears.push({
            year: pastQuestions.question_year,
            session: pastQuestion.header.session,
            semester_exam: pastQuestion.header.examType
        })
        pastQuestion.questions.map((question) => {
            topics.push(question.topic)
        })
    })
    })  
    this.props.addActiveCourseTopics([...new Set(topics)])
    this.props.addActiveCourseYears([...new Set(pastQuestionYears)])
    console.log(pastQuestionYears)
}
render () { 
    console.log(this.props.pastQuestionApiDatas)
    let content = (
    this.props.pastQuestionApiDatas.map((uni) => (
        <React.Fragment>
            <li>
                {/* <input id = {uni.uni_id} onClick = {() => {this.deleteSection(uni.uni_id)}} type = "checkbox" /> */}
                <a onClick = {() => (this.toggleElementView(uni.uni_id))}>{uni.uni_name}</a>
                <ul key = {uni.uni_id} id = {uni.uni_id}>
                    {uni.departments.map((dept) => (
                    <React.Fragment>
                        <li>
                            {/* <input id = {dept.dept_id} onClick = {() => (this.deleteSection(uni.uni_id, dept.dept_id))} type = "checkbox" /> */}
                        <a onClick = {() => (this.toggleElementView(dept.dept_id))}>{dept.dept_name}</a> 
                            <ul key = {dept.dept_id} id = {dept.dept_id}>
                            {dept.courses.map((course) => (
                                <React.Fragment>
                                <li>
                                    {/* <input id = {course.course_id} onClick = {() => {this.deleteSection(uni.uni_id, dept.dept_id, course.course_id)}} type = "checkbox" /> */}
                                    <a onClick = {() => (this.toggleElementView(course.course_id))}>{course.course_name}</a>
                                        <ul key = {course.course_id} id = {course.course_id}>
                                            {course.past_questions.map((year) => (
                                                <React.Fragment>
                                                <li>
                                                    {/* <input id = {year.year_id} onClick = {() => {this.deleteSection(uni.uni_id, dept.dept_id, course.course_id, year.year_id)}} type = "checkbox" /> */}
                                                    <a onClick = {() => (this.toggleElementView(year.year_id))}>{year.question_year}</a>
                                                    <ul key = {year.year_id} id = {year.year_id}>
                                                                {year.question_datas.map((pastQst) => (
                                                                <React.Fragment>
                                                                    <li>
                                                                        {/* <input id = {pastQst.pastQst_id} onClick = {() => {this.deleteSection(uni.uni_id, dept.dept_id, course.course_id, year.year_id, pastQst.pastQst_id)}} type = "checkbox" /> */}
                                                                        <a onClick = {() => {
                                                                            const {uni_fullName, uni_location} = uni
                                                                            const {dept_name} = dept
                                                                            const {course_name, course_title} = course
                                                                            this.addTopic_Years(course)
                                                                            this.props.addUni_info(uni) //I don't think i need to add this
                                                                            this.props.addActiveCourseData(course)
                                                                            this.props.addActivePastQuestionData({
                                                                                uni_info: {
                                                                                    uni_fullName, uni_location
                                                                                },
                                                                                course_info : {
                                                                                    course_name, course_title, dept_name, year: year.question_year
                                                                                }, 
                                                                                questionData: {...pastQst}})
                                                                            this.props.handleShowContentArea()
                                                                            this.props.enableToolBarBtn()
                                                                            // this.props.addActiveCourseTopics
                                                                        }}>{pastQst.header.examType + " " + pastQst.header.session}</a>
                                                                    </li>
                                                                    </React.Fragment>
                                                            ))}
                                                    </ul>
                                                </li>
                                                </React.Fragment>
                                                ))}
                                            </ul>
                                </li>
                                </React.Fragment>
                                ))}
                            </ul>
                        </li>
                       </React.Fragment>
                     ))}
            </ul>
            </li>
            </React.Fragment>
    )))

return (
<div id = "NavSideBar">
<ul id = "downloadedUni">
{content}
</ul>
</div>
)
}
}


const mapStateToProps = (state, props) => ({
    pastQuestionApiDatas : state.PastQuestionApiDatas
})

const mapDispatchToProps = (dispatch, props) => ({
    addUni_info : (data) =>  dispatch(addUni_info(data)),
    addActiveCourseData : (data) => dispatch(addActiveCourseData(data)),
    addActivePastQuestionData: (data) => dispatch(addActivePastQuestionData(data)),
    addActiveCourseTopics: (data) => dispatch(addActiveCourseTopics(data)),
    addActiveCourseYears: (data) => dispatch(addActiveCourseYears(data))
})
 
export default connect(mapStateToProps, mapDispatchToProps)(NavSideBar);