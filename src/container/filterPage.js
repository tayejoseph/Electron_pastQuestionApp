import React from "react";
import {connect} from "react-redux";
import {addFilteredData} from "./../actions/contentArea";

class filterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedTopics: [],
            checkedQuestions: []
        }
    }
    takeMeBack = () => {
        this.props.history.push("/")
        
    }
    getUniqueArray = (array) => {
        const unique = [
            ...new Set(array)
        ] //this is used in removing the duplicate topic in the array 
        return unique
    }
    topicCheckHandler = (e) => {
        console.log(e.target.value)
        this.setState({
            checkedTopics: [
                ...this.state.checkedTopics,
                   e.target.value
            ]
        })
    }
    questionHandler = (e) => {
        console.log(e.target.value)
        this.setState({
            checkedQuestions: [
                ...this.state.checkedQuestions,
                   e.target.value
            ]
        })
    }
    filterQuestions = () => {
        const filteredQuestions = {
            courseName: this.props.filterDatas.activeCourseName,
            filteredQuestion: []
        };
       this.state.checkedQuestions.map((paper) => {
           const year_Semester = paper.split(" ");
           this.props.filterDatas.activeCourseData.past_questions.map((questionPaper) => {
            console.log(questionPaper)
            if(questionPaper.year === year_Semester[0]){
            questionPaper.question_data.map((questionWrapper) => {
                if(questionWrapper.header.semester === year_Semester[1]) {
                    this.state.checkedTopics.map((topic) => {
                     questionWrapper.questions.map((questionItem) => {
                         if(topic === questionItem.topic) {
                             filteredQuestions.filteredQuestion.push({
                                 questionData: questionItem,
                                 semester_year : paper   
                             }) 
                        }
                     })
                    
                    })
                }
            })
        }
           })
       })

       //U NEED TO MAKE A WAY THAT IF THE USER DO NOT CHECK ANYTHING THEN THE FILTERBTN WILL NOT WORK
        console.log(this.state.checkedTopics)
        
        this.props.addFilteredData(filteredQuestions)
        console.log(this.props.gg)
        console.log(filteredQuestions)
        console.log(this.props.gg)
        this.props.history.push("/")
        
    }


    render () {
        // this.takeMeBack()
        console.log(this.props.filterDatas)
        const {activeCourseName, activeCourseData} = this.props.filterDatas
        let Topics = [];
        let courseTopic;
        let questionYear;
        let questionPresentDatas = []; //this is what will show in the filter section of the page year section
        console.log(activeCourseData);
        activeCourseData.past_questions.map((course) => {
            course.question_data.map((questionCover) => {
                questionPresentDatas.push({
                    "question_year": `${course.year}`,
                    "course": `${activeCourseName}`,
                    "paperTitle": `${questionCover.header.semester}`
                })
               questionCover.questions.map((question) => {
                   Topics.push(question.topic)
               })
            })
        
        
        });
        console.log(questionPresentDatas) //This are the year data we need to use for the filter page 
        Topics = this.getUniqueArray(Topics)
        
        courseTopic = (
            <div>
                <ol>
                    {Topics.map((topic) => (
                        <li key = {topic}><input type = "checkbox" onClick = {this.topicCheckHandler} value = {topic}/>{topic}</li>
                    ))}
                </ol>
            </div>
        )
        questionYear = (
            <div>
                <ol>
                    {
                        questionPresentDatas.map((question, index) => (
                            <li key = {index} ><input type = "checkbox" onClick = {this.questionHandler} value = {`${question.question_year} ${question.paperTitle}`} />{question.question_year} {question.course} {question.paperTitle} semester</li>
                        ))
                    }
                </ol>
            </div>
        )
     
        return (
            <div>
                <h1>Filter Question</h1>
                <h2>{activeCourseName} Topics</h2> 
                {courseTopic}
                <h2>{activeCourseName} question Year</h2>
                {questionYear}
                <button onClick = {this.filterQuestions}>filter</button>
                <button onClick = {this.takeMeBack}>Cancel</button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    filterDatas: state.filterQuestionsData.filterDatas,
    gg: state.filterQuestionsData
});

const mapDispatchToProps = (dispatch, props) => ({
    addFilteredData: (data) => dispatch(addFilteredData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(filterPage)