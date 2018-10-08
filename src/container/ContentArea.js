import React from "react"
import {connect} from "react-redux";

class ContentArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propsReceived: false,
            header: "Welcome To The PastQuestion App",
            uni_info: "",
            question_info: ""
        }
    }
    componentWillReceiveProps (newProps) {
        console.log(newProps)
        // const question_info = newProps.currentQuestion.questionData.header;
        const {courseName, courseDepartment, courseTitle, year} = newProps.currentQuestion;
        const {questions, header} = newProps.currentQuestion.questionData;
        const uni_info = newProps.uni_info;
        this.setState({
                    propsReceived: true,
                    question_info: header,
                    questions,
                    uni_info,
                    course_info: {
                        courseName, courseDepartment, courseTitle, year
                    }                    
                })
             
              console.log(header)
              console.log(questions)
              console.log(uni_info)
    }
    render () {
        let content;
        let gg;


        if (this.state.propsReceived) {
            console.log(this.state.question_info)
            console.log(this.props.uni_info)
            console.log(this.state.header)
            const {uniTitle, uniLogo, uniLocation} = this.state.uni_info;
            const {courseName, courseDepartment, courseTitle, year} = this.state.course_info;
            const {exam, instruction, questionType, semester, time} = this.state.question_info;
            const questions = this.state.questions

            content = (
                <hgroup>
                <h2>{uniTitle}, {uniLocation.state}, {uniLocation.country}</h2>
                <h2>{courseDepartment}</h2>
                <h2>{year} {semester} {exam}</h2>
                <h2>{courseName} - {courseTitle}</h2>
                {console.log(questions)}
                {
                    questions.map((question, index) => (
                            <div key = {index}>
                            <p><span style = {{"marginRight": "20px"}}>{index + 1}</span>{question.question}</p> 
                          {this.props.showSolution ? (question.answer ? (
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
                            
                    )
                }
                </hgroup>
            )
        } else {
            content = (
                <h1>{this.state.header}</h1>
                )
             }


    return (
    <div id = "contentArea">
    {content}
    </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    currentQuestion: state.activeCourse.activeQuestionData,
    uni_info: state.activeCourse.uni_info
})
export default connect(mapStateToProps, null)(ContentArea);