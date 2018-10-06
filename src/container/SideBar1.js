import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {activeCourse} from "./../actions/contentArea";

import unis from "./uni_api";



//U CAN CREATE A SPECIAL FUNCTION THAT WILL CREATE THE LIST FOR EACH QUSTION INSTEAD OF U HAVE MULTIPLE FUNCTION THAT DOES THE SAMETHING
class SideBar1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = []
    }
    onUniclickHandler(courses, list) {
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
            a.onclick = () => {this.onYearHandler(course.name, course.past_questions, li)}
            console.log(course.past_questions)
            // this.props.selectedCourse(course) //this active/update the active course store
            a.appendChild(text)
            li.appendChild(a);
            ul.appendChild(li)
            list.appendChild(ul);
        })
        }
    }
    onYearHandler(courseName, activeCourseData, list) {
        if(list.classList.contains("active") && list.querySelector("ol")){
            list.removeChild(list.querySelector("ol"));
        } else {
        list.className = "active"
        console.dir(list)
        const ul = document.createElement('ol')
        const question = activeCourseData.map((question) => {
            const activeQuestionData = {
                questionData : question.questionDatas,
                courseName,
                year: question.year
            };
            const a = document.createElement('a')
            const li = document.createElement("li")
            const text = document.createTextNode(question.year);
            a.onclick = () => {
                this.props.activeCourse_Question(activeQuestionData, activeCourseData) //this is used to add questions to the contentAreaSection
            }
            a.appendChild(text)
            li.appendChild(a);
            ul.appendChild(li)
            list.appendChild(ul);
        })
        }   
     }
    setQuestionData(data) {
        console.log(data)
    }
    componentDidMount() {
        const list = document.querySelector("#downloadedUni")
        const schools = unis.map((university) => {
            console.log(university)
            const a = document.createElement('a')
            const li = document.createElement("li")
            const text = document.createTextNode(university.name);
            a.onclick = () => {this.onUniclickHandler(university.courses, li)}
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
    activeCourse_Question: (activeQuestionData, activeCourseData) => dispatch(activeCourse({activeQuestionData, activeCourseData}))
})

export default connect(null, mapDispatchToProps)(SideBar1);