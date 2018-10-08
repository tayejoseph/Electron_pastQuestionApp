import React from "react";
import {connect} from "react-redux";
import {addFilterData} from "./../actions/contentArea";

class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true, //this will be used to enable the button when ever the click in a question,
            answers: ""
        }
    }
    answerClickHandler = () => {
        // console.log(this.state.answers)
    //I am going to send the questions answers to the electron side of the app so that i can use it to update the propup window for answers
    }
    filterQuestionHandler = () => {
        // console.log(this.props.activeCourse);
        const { activeCourseData, activeQuestionData} = this.props.activeCourse;
        const {courseName, year} = activeQuestionData;
        const courseData = {
            activeCourseData,
            activeCourseName: courseName,
            activeQuestionYear: year
        } //this is are all the data that we need to send to the filterSection(course datas)
       
       this.props.addFilterData(courseData);
       this.props.filterPage()
        
        // console.log(this.props.filter)
     
    }
    disableToolBarBtn = (e) => {
        if(e.target.value === "Exam"){
            this.setState({
                disable: true
            });
            this.props.modeChangeHandler(false)
        } else {
            this.setState({
                disable: false
            });
            this.props.modeChangeHandler(true)       
         }
    }
    componentWillReceiveProps (newProps) {

        //this is used to return the mode back to text mode when ever the user change/click to another question from exam mode
        document.querySelector("select").options.selectedIndex = 0;
        console.log(newProps)
        //this will only enable the show solution btn only if the questions are supplied
        if (!newProps.activeCourse.activeQuestionData.questions) {
            console.log(this.props.disableToolBar)
            this.setState({
                disable: false
            })
            console.log("addsd")
        } 
        else {
            const answers = []
            newProps.activeQuestion.questions.map((question, index) => {
                answers.push({
                    "No.":  index+1,
                    "answer" : question.answer
                })
            })
            this.setState({
                disable: false,
                answers: answers
            })
            console.log(answers)
        } 
    }
    render () {
        //the anwer btn when click will show like a page with the question no and also the answer
        //the solution btn when clicked will enable the answer and solution under each answer sections in the question
        return (
            <div id = "toolBar">
            <ul>
            <li><button onClick = {this.answerClickHandler} disabled = {this.state.disable}>Answer</button></li>
            <li><button onClick = {this.props.toggleContentSolution} disabled = {this.state.disable}>Solution</button></li>
            <li><button onClick = {this.filterQuestionHandler} disabled = {this.state.disable}>Filter Question</button></li>
            <li>
            <select onChange = {this.disableToolBarBtn}>
            <option value="Test">Test Mode</option>
            <option value="Exam">Exam Mode</option>
            </select>
            </li>
            <li><button disabled = {this.state.disable}>Download</button></li>
            <li><button disabled = {this.state.disable}>Upload</button></li>
            <li id = "feedBack"><button disabled = {this.state.disable} >FeedBack</button></li>
            </ul>
            </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch, props) => ({
    addFilterData: (data) => dispatch(addFilterData(data))
})
const mapStateToProps = (state, props) => ({
    activeCourse: state.activeCourse,
    filter: state.filterQuestionsData
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
