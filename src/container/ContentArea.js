import React from "react";
import {connect} from "react-redux";
import AnswerContent from "./../component/AnswerContent";
import FilterContent from "./../component/FilterContent";


class ContentArea extends React.Component {
constructor(props) {
    super(props)
    this.state = {
        course_info: this.props.currentQuestionData.course_info,
        uni_info: this.props.currentQuestionData.uni_info,
        question_info: this.props.currentQuestionData.questionData.header,
        questions: this.props.currentQuestionData.questionData.questions,
        filterDataReceived: false,
        filteredTopics: [],
        filteredQuestions: [],
        answersData: []
    }
}
componentWillReceiveProps(newProps) {
    console.log(newProps)
    const {currentQuestionData, filteredDatas} = newProps;
    console.log(newProps)
    const answersData = [];
    if(currentQuestionData !== this.props.currentQuestionData) { //u naeed to correct this later
    const {course_info, questionData, uni_info} = currentQuestionData;
    this.setState({
        course_info: course_info,
        uni_info: uni_info,
        question_info: questionData.header,
        questions: questionData.questions,
        filteredQuestions: []
    })
    questionData.questions.map((question, index) => {
        console.log(question)
        answersData.push({
            num: index+1,
            answer: question.answer
        })
    })
    this.setState({
            answersData
        })
    } else if(filteredDatas !== this.props.filteredDatas) {
    const {filteredTopics, filteredQuestions} = filteredDatas
    this.setState({
        filteredTopics,
        filteredQuestions
    })
    console.log(filteredQuestions)
    filteredQuestions.map((filteredQuestion, index) => {
            answersData.push({
                semester_year: filteredQuestion.semester_year,
                num: index+1,
                answer: filteredQuestion.questionData.answer
            })
        })
    this.setState({
            answersData
        })
        console.log(this.state.filteredQuestions)
    }
}
componentWillMount() {
    const answersData = [];
    this.props.currentQuestionData.questionData.questions.map((question, index) => {
        answersData.push({
            num: index+1,
            answer: question.answer
        })
    })
    this.setState({
            answersData
        })
}
render () {
    console.log(this.state)
    let content;
    const {filteredTopics, filteredQuestions, question_info, questions, course_info, uni_info} = this.state
    const {uni_fullName, uniLogo, uni_location} = uni_info;
    const {course_name, courseDepartment, course_title, year} = course_info;
    const {exam, instruction, questionType, session, time} = question_info;
    const header = (
        <React.Fragment>
            <h2>{uni_fullName}, {uni_location.state}, {uni_location.country} .</h2>
            <h2>{courseDepartment}</h2>
            <h2>{year} {session} {exam}</h2>
            <h2>{course_name} - {course_title}</h2>
        </React.Fragment>
    )
    console.log(filteredQuestions)
    if(filteredQuestions.length === 0) {
        content = (
            <div>
            <hgroup>
            {header}
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
    } else {
        content = (
            <div>
            <hgroup>
            {header}
            {filteredTopics ? filteredTopics.length >= 1 ? (<h3>Filtered Topics: {
                filteredTopics.map((topic, index) => (
                    <span key = {index}>
                    {
                    (filteredTopics[filteredTopics.length -1] === topic) ? (
                        <span>{topic} .</span>
                    ) : (
                        <span>{topic}, </span>
                    )
                    }
                </span>
                ))
            }</h3>) : "" : "" }
            </hgroup>                
            {console.log(filteredQuestions)}

            {
                filteredQuestions.map((questionDatas, index) => {
                return (
                        <div key = {index}>
                        <p>{questionDatas.semester_year}</p>
                        <p><span style = {{"marginRight": "20px"}}>{index + 1}</span>{questionDatas.questionData.question}</p> 
                      {
                        this.props.showSolution ? (questionDatas.questionData.answer ? (
                            <p><span style = {{"marginRight": "20px"}}>Answer:</span>{questionDatas.questionData.answer}</p>   
                      ) : ("")) 
                      : ("")
                      }
                      {
                           this.props.showSolution ? 
                           (questionDatas.questionData.solution ? (
                          <div id = "solution">
                          <p>solution</p>
                          <p>{questionDatas.questionData.solution}</p>
                          </div> ) 
                          : (""))
                       : ("")
                      }
                        </div>
            )
            })
            }
            </div>
            
        )    }
    return (
        <div id = "ContentArea">
        {content}
        {   
            this.props.answerModal ? <AnswerContent 
            uni_course_info = {{...this.state.uni_info, ...this.state.course_info}}
            answerData = {{filteredTopics: this.state.filteredTopics, answersData: this.state.answersData}}
            answerModal = {this.props.answerModal}
            handleAnswerModalHide = {this.props.handleAnswerModalHide}
            /> : ""
        }
        {
            this.props.filterModal ? <FilterContent 
            uni_course_info = {{...this.state.uni_info, ...this.state.course_info}}
            filterModal = {this.props.filterModal}
            handleFilterModalHide = {this.props.handleFilterModalHide}
            /> : ""
        }
        </div>
    )   
}
}

const mapStateToProps = (state, props) => ({
    currentQuestionData: state.ActivePastQuestionDatas.currentQuestionData,
    uni_info: state.ActivePastQuestionDatas.uni_info,
    filteredDatas: state.ActivePastQuestionDatas.filteredDatas
})


export default connect(mapStateToProps, null)(ContentArea);