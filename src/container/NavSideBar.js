import React from "react";
import {connect} from "react-redux";
import {addUni_info, addActiveCourseTopics, addActiveCourseData, addActivePastQuestion} from "./../actions";

class NavSideBar extends React.Component {
onCourseHandler (uni_info, courses, list) {
    if (list.classList.contains("active") && list.querySelector("ol")) {
        list.removeChild(list.querySelector("ol"));
    } else {
        list.className = "active"
        const ul = document.createElement('ol')
        courses.map((course) => {
        const span = document.createElement("span")
        span.setAttribute("id", "list")
        const a = document.createElement('a')
        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("value", course.name)           
        const li = document.createElement("li")
        const text = document.createTextNode(course.name);
        const courseInfo = {
            courseName: `${course.name}`,
            courseDepartment: `${course.department}`,
            courseTitle: `${course.title}`
        }
        a.onclick = () => {
            // this.props.addActiveCourseData(course)
            const topics = [];
            const pastQuestionYears = [];
            course.past_questions.map((pastQuestions) => {
            pastQuestions.question_data.map((pastQuestion) => {
                pastQuestion.questions.map((question) => {
                    topics.push(question.topic)
                    pastQuestionYears.push({
                        year: pastQuestions.year,
                        session: pastQuestion.header.session,
                        semester_exam: pastQuestion.header.exam
                    })
                })
            })
            })  
            // this.props.addActiveCourseTopics([...new Set(topics)]) //this is a new es6way of filtering data on an array
            this.onYearHandler({uni_info, courseInfo, course, topics: [...new Set(topics)], pastQuestionYears}, li)
        }
        a.appendChild(text)
        span.appendChild(checkbox)
        span.appendChild(a)
        li.appendChild(span);
        ul.appendChild(li)
        list.appendChild(ul);
        })
    }
}
onYearHandler (course_infos, list) {
    if(list.classList.contains("active") && list.querySelector("ol")){
        list.removeChild(list.querySelector("ol"));
    } else {
    list.className = "active"
    const ul = document.createElement('ol');
    course_infos.course.past_questions.map((question) => {
         const span = document.createElement("span")
        span.setAttribute("id", "list")
        const a = document.createElement('a') 
        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("value", question.year) 
        const li = document.createElement("li")
        const text = document.createTextNode(question.year);
        a.onclick = () => {
            this.onModeTypeHandler(
              question.question_data,
              course_infos,
            li) //this is used to add questions to the contentAreaSection
        }
        a.appendChild(text)
        span.appendChild(checkbox)
        span.appendChild(a)
        li.appendChild(span);
        ul.appendChild(li)
        list.appendChild(ul);
    })
    }   
 }
onModeTypeHandler = (currentQuestion, course_infos, list) => {
// this is used to create a drop down for each year in the nav section for the exam or text question
if(list.classList.contains("active") && list.querySelector("ol")){
    list.removeChild(list.querySelector("ol"));
} else {
list.className = "active"
const ul = document.createElement('ol')

currentQuestion.map((question) => {
    const span = document.createElement("span")
    span.setAttribute("id", "list")
    const a = document.createElement('a')
    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("value", question.header.exam) 
    const li = document.createElement("li")
    const text = document.createTextNode(question.header.exam);
  
    a.onclick = () => {
        const {uni_info, course, topics, pastQuestionYears, courseInfo} = course_infos
        this.props.addUni_info(uni_info)
        this.props.addActiveCourseData(course)
        this.props.addActiveCourseTopics(topics) //this is a new es6way of filtering data on an array
        this.props.addActivePastQuestion({courseInfo, question})
        document.querySelector("select").selectedIndex = 0 //this is used to set the mode to test mode anytime the nav btn is clicked
        this.props.handleShowContentArea() 
        this.props.enableToolBarBtn()
        // this is used to clear the filtered question when ever a question to be appeared to the screen is clicked
        //     this first check if their are any filtered data in the state
        //  activeQuestionData
        //  this.props.filteredData ? this.props.clearFilteredQuestion() : ""
        //  this.props.activeCourse_Question(
        //      uni_info, {
        //          ...currentQuestion,
        //          questionData: question
        //     }, 
        //  activeCourseData) //this is used to add questions to the contentAreaSection
    }
    a.appendChild(text)
    // span.appendChild(checkbox)
    // span.appendChild(a)
    li.appendChild(a);
    ul.appendChild(li)
    list.appendChild(ul);
})
}       

}
componentDidMount () {
    if(this.props.pastQuestionApiDatas) {
        const list = document.querySelector("#downloadedUni");
        this.props.pastQuestionApiDatas.map((university) => {
            const uni_info = {
                "uniName": university.name,
                "uniTitle": university.title,
                "uniLogo": university.logo,
                "uniLocation": university.location
            }
        const span = document.createElement("span")
        span.setAttribute("id", "list")
        const a = document.createElement('a')
        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("value", university.name)
        const li = document.createElement("li")
        const text = document.createTextNode(university.name);
        a.onclick = () => {
            this.onCourseHandler(uni_info, university.courses, li)
            // this.props.addUni_info(uni_info)
        }
        // checkbox.appendChild(a)
        // span.appendChild(checkbox)
        a.appendChild(checkbox)
        a.appendChild(text)

        li.appendChild(a)
        list.appendChild(li);
        })


    }
}
render () {
    return (
        <div id = "NavSideBar">
        <ul id = "downloadedUni">
        
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
    addActivePastQuestion: (data) => dispatch(addActivePastQuestion(data)),
    addActiveCourseTopics: (data) => dispatch(addActiveCourseTopics(data))
})
 
export default connect(mapStateToProps, mapDispatchToProps)(NavSideBar);