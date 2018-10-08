import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {activeCourse} from "./../actions/contentArea";

import unis from "./uni_api2";



//U CAN CREATE A SPECIAL FUNCTION THAT WILL CREATE THE LIST FOR EACH QUSTION INSTEAD OF U HAVE MULTIPLE FUNCTION THAT DOES THE SAMETHING
class SideBar1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = []
    }
    onCourseHandler(uni_info, courses, list) {
        console.log(courses)
        if(list.classList.contains("active") && list.querySelector("ol")){
            list.removeChild(list.querySelector("ol"));
        } else {
        list.className = "active"
        console.dir(list)
        const ul = document.createElement('ol')
        const uni_courses = courses.map((course) => {
            const a = document.createElement('a')
            const li = document.createElement("li")
            const text = document.createTextNode(course.name);
            const courseInfo = {
                courseName: `${course.name}`,
                courseDepartment: `${course.department}`,
                courseTitle: `${course.title}`
            }
            a.onclick = () => {this.onYearHandler(uni_info, courseInfo, course, li)}
            console.log(course.past_questions)
            // this.props.selectedCourse(course) //this active/update the active course store
            a.appendChild(text)
            li.appendChild(a);
            ul.appendChild(li)
            list.appendChild(ul);
        })
        }
    }
    onYearHandler(uni_info, courseInfo, activeCourseData, list) {
        if(list.classList.contains("active") && list.querySelector("ol")){
            list.removeChild(list.querySelector("ol"));
        } else {
        list.className = "active"
        console.dir(list)
        const ul = document.createElement('ol');
        const currentQuestion = {
            ...courseInfo,
            questionData : "",
            year: ""
        };
        console.log(activeCourseData)
        activeCourseData.past_questions.map((question) => {
            console.log(question)
            currentQuestion.questionData = question.question_data;
            currentQuestion.year = question.year;
            const a = document.createElement('a')
            const li = document.createElement("li")
            const text = document.createTextNode(question.year);
            a.onclick = () => {
                this.onModeTypeHandler(uni_info, currentQuestion, activeCourseData,li) //this is used to add questions to the contentAreaSection
            }
            a.appendChild(text)
            li.appendChild(a);
            ul.appendChild(li)
            list.appendChild(ul);
        })
        }   
     }
    onModeTypeHandler = (uni_info, currentQuestion, activeCourseData, list) => {
    //this is used to create a drop down for each year in the nav section for the exam or text question
    if(list.classList.contains("active") && list.querySelector("ol")){
        list.removeChild(list.querySelector("ol"));
    } else {
    list.className = "active"
    console.dir(list)
    const ul = document.createElement('ol')
    
    currentQuestion.questionData.map((question) => {
        const activeQuestionData = { //I thinl their is a problem with the maping of creating the activeQuestionData
        ...currentQuestion,
        questionData : question
         }

        const a = document.createElement('a')
        const li = document.createElement("li")
        const text = document.createTextNode(question.header.exam);
      
        a.onclick = () => {
            this.props.activeCourse_Question(uni_info, activeQuestionData, activeCourseData) //this is used to add questions to the contentAreaSection
        }
        a.appendChild(text)
        li.appendChild(a);
        ul.appendChild(li)
        list.appendChild(ul);
    })
    console.log(currentQuestion)
    console.log(activeCourseData)
    }     
    }
    setQuestionData(data) {
        console.log(data)
    }
    componentDidMount() {
        const list = document.querySelector("#downloadedUni")
        const schools = unis.map((university) => {
            console.log(university)
            const uni_info = {
                "uniName": university.name,
                "uniTitle": university.title,
                "uniLogo": university.logo,
                "uniLocation": university.location
            }
            const a = document.createElement('a')
            const li = document.createElement("li")
            const text = document.createTextNode(university.name);
            a.onclick = () => {this.onCourseHandler(uni_info, university.courses, li)}
            console.log(university.courses)
            a.appendChild(text)
            li.appendChild(a);
            list.appendChild(li);
        })

        }
    render () {            
        return (
        <div id = "sideBar1">
            <ul id = "downloadedUni">
            </ul>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    // currentQuestion : (year, data, course) => dispatch(activeQuestion({course, year, data})),
    activeCourse_Question: (uni_info, activeQuestionData, activeCourseData) => dispatch(activeCourse({uni_info, activeQuestionData, activeCourseData}))
})

export default connect(null, mapDispatchToProps)(SideBar1);