import React from "react"
import {connect} from "react-redux";
import {receiveFilterData_ipc, addFilteredData, addAnswersData} from "./../actions/contentArea";
const { ipcRenderer } = window.require('electron');

class ContentArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propsReceived: false,
            header: "Welcome To The PastQuestion App",
            uni_info: "",
            question_info: "",
            filteredQuestions: "",
            filteredTopics: "",
            course_info: {}
        }
    }
    componentWillReceiveProps (newProps) {
        //this is used to check if the filtered data has been uploaded to the state
        if(newProps.filteredData) {
            console.log("ADSSasasfa")
            //this set the state for the filtered question after the question is filtered
            this.setState({
                filteredTopics: newProps.filteredData.filteredTopics,
                filteredQuestions: newProps.filteredData.filteredQuestions
            })
        }
        else if (newProps.currentQuestion || newProps.uni_info) {
        const {courseName, courseDepartment, courseTitle, year} = newProps.currentQuestion;
        const {questions, header} = newProps.currentQuestion.questionData;
        console.log(questions)
        const uni_info = newProps.uni_info;
        console.log(this.state.currentQuestion)
        this.setState({
                    propsReceived: true,
                    question_info: header,
                    filteredQuestions: "",
                    filteredTopics: "",
                    questions,
                    uni_info,
                    course_info: {
                        courseName, courseDepartment, courseTitle, year
                    }                    
                })

        } 
    }
    render () {
        // console.log(receiveFilterData_ipc())
        ipcRenderer.on("filteredData:received", (event, data) => {
            console.log(data)
            this.props.addFilteredData(data)
        });
        let content;
        let answersData = [];
        if (this.state.propsReceived) {
            // console.log()
            const {uniTitle, uniLogo, uniLocation} = this.state.uni_info;
            const {courseName, courseDepartment, courseTitle, year} = this.state.course_info;
            const {exam, instruction, questionType, semester, time} = this.state.question_info;
            const questions = this.state.questions
            if (this.state.filteredTopics && this.state.filteredQuestions) { //this runs when the question is already filtered to set up the filtered question in the content area
                console.log(this.state.filteredData)
            content = (
                <div>
                <hgroup>
                <h2>{uniTitle}, {uniLocation.state}, {uniLocation.country} .</h2>
                <h2>{courseDepartment}</h2>
                <h2>Filtered Questions for {courseName}</h2>
                <h2>{courseName} - {courseTitle}</h2>
                <h3>Filtered Topics: {
                    this.state.filteredTopics.map((topic) => (
                        <span>
                        {
                        (this.state.filteredTopics[this.state.filteredTopics.length -1] === topic) ? (
                            <span>{topic} .</span>
                        ) : (
                            <span>{topic}, </span>
                        )
            
                    }
                    </span>
                    ))
                }</h3>
                </hgroup>
               {
                   this.state.filteredQuestions.map((questions, index) => {
                    {
                        answersData.push({
                        num: index+1,
                        answer: questions.answer
                    })
                }
                return (
                   <div key = {index}>
                   <p>{questions.semester_year} Past Question</p>
                   <p><span style = {{"marginRight": "20px"}}>{index + 1}</span>{questions.questionData.question}</p> 
                    {questions.questionData.options.map((option) => (
                        <div>
                            { //this is for the options
                                console.log(questions.solution)
                                
                                // <p><span style = {{"marginRight": "20px"}}>{option.key}</span>{option.value}</p>
                            }
                        </div>
                    ))}
                    {
                        this.props.showSolution ? (questions.questionData.answer ? (
                            <p><span style = {{"marginRight": "20px"}}>Answer:</span>{questions.questionData.answer}</p>   
                        ) : ("")) 
                        : ("")
                        }
                        {
                            this.props.showSolution ? 
                            (questions.questionData.solution ? (
                            <div id = "solution">
                            <p>solution</p>
                            <p>{questions.questionData.solution}</p>
                            </div> ) 
                            : (""))
                        : ("")
                        }
                    </div>
               )
            }
            )}   
               </div> 
            )
            this.props.addAnswersData(answersData)
            } else {
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
                        {
                            answersData.push({
                            num: index+1,
                            answer: question.answer
                            })
                        }
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
            this.props.addAnswersData(answersData)
        } 
    }
        else {
            content = (
                <h1>{this.state.header}</h1>
                )
             }

             console.log(answersData)
             answersData = null;

    return (
    <div id = "contentArea">
    {content}
    </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    addFilteredData: (data) => dispatch(addFilteredData(data)),
    addAnswersData: (data) => dispatch(addAnswersData(data))
})

const mapStateToProps = (state, props) => ({
    filteredData: state.filterQuestionsData.filteredData,
    currentQuestion: state.activeCourse.activeQuestionData,
    uni_info: state.activeCourse.uni_info
})
export default connect(mapStateToProps, mapDispatchToProps)(ContentArea);