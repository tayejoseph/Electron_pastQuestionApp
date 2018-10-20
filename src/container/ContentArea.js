import React from "react";
import {connect} from "react-redux";
import AnswerContent from "./../component/AnswerContent";
import FilterContent from "./../component/FilterContent";


class ContentArea extends React.Component {
constructor(props) {
    super(props)
    this.state = {
        course_info: {},
        uni_info: {},
        question_info: {},
        questions: [],
        filterDataReceived: false,
        answerData : {
            topics: [],
            answersData: []
        }
    }
}
componentWillReceiveProps(newProps) {
    console.log(newProps)
    if(newProps.currentQuestionData) {
        const answersData = [];
    this.setState({
        course_info: newProps.currentQuestionData.courseInfo,
        uni_info: newProps.uni_info,
        filterInitDatas: this.props.filterInitDatas,
        question_info: newProps.currentQuestionData.question.header,
        questions: newProps.currentQuestionData.question.questions
    })
    newProps.currentQuestionData.question.questions.map((question, index) => {
        console.log(question)
        answersData.push({
            num: index+1,
            answer: question.answer
        })
    })
    this.setState((prevState) => ({
        answerData: {
            ...prevState.answerData,
            answersData
        }
    }))
    }
}
componentWillMount() {
    const answersData = [];
    this.setState({
        course_info: this.props.currentQuestionData.courseInfo,
        uni_info: this.props.uni_info,
        filterInitDatas: this.props.filterInitDatas,
        question_info: this.props.currentQuestionData.question.header,
        questions: this.props.currentQuestionData.question.questions
    })
    this.props.currentQuestionData.question.questions.map((question, index) => {
        console.log(question)
        answersData.push({
            num: index+1,
            answer: question.answer
        })
    })
    this.setState((prevState) => ({
        answerData: {
            ...prevState.answerData,
            answersData
        }
    }))

}
render () {
    let content;
    const {uniTitle, uniLogo, uniLocation} = this.state.uni_info;
    const {courseName, courseDepartment, courseTitle, year} = this.state.course_info;
    const {exam, instruction, questionType, semester, time} = this.state.question_info;
    const questions = this.state.questions
    if(!this.state.filterDataReceived) {
        content = (
            <div>
            <hgroup>
            <h2>{uniTitle}, {uniLocation.state}, {uniLocation.country} .</h2>
            <h2>{courseDepartment}</h2>
            <h2>{year} {semester} {exam}</h2>
            <h2>{courseName} - {courseTitle}</h2>
            </hgroup>
            {
                questions.map((question, index) => {
            return (
                        <div key = {index}>
                        <p><span style = {{"marginRight": "20px"}}>{index + 1}</span>{question.question}</p> 
                      {
                        this.props.showSolution ? (question.answer ? (
                            <p><span style = {{"marginRight": "20px"}}>Answer:</span>{question.answer}</p>   
                      ) : ("")) 
                      : ("")
                      }
                      {
                           this.props.showSolution ? 
                           (question.solution ? (
                          <div id = "solution">
                          <p>solution</p>
                          <p>{question.solution}</p>
                          </div> ) 
                          : (""))
                       : ("")
                      }
                        </div>
            )
            })
            }
            </div>
            
        )
    }
    console.log(this.state)
    return (
        <div id = "ContentArea">
        {content}

        <AnswerContent 
        uni_course_info = {{...this.state.uni_info, ...this.state.course_info}}
        answerData = {this.state.answerData}
        answerModal = {this.props.answerModal}
        handleAnswerModalHide = {this.props.handleAnswerModalHide}
        />

        <FilterContent 
        uni_course_info = {{...this.state.uni_info, ...this.state.course_info}}
        courseData = {this.state.filterInitDatas}
        filterModal = {this.props.filterModal}
        handleFilterModalHide = {this.props.handleFilterModalHide}
        />

        </div>
    )   
}
}

const mapStateToProps = (state, props) => ({
    currentQuestionData: state.ActivePastQuestionDatas.currentQuestionData,
    uni_info: state.ActivePastQuestionDatas.uni_info,
    filterInitDatas: state.ActivePastQuestionDatas.activeCourseDatas
})


export default connect(mapStateToProps, null)(ContentArea);