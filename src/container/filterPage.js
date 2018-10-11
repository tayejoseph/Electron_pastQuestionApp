import React from "react";
import {connect} from "react-redux";
import {addfilterData_ipc} from "./../actions/contentArea";
const { ipcRenderer } = window.require('electron');

class filterPage extends React.Component {
    constructor(props) {
        super(props);
        ipcRenderer.send("sync:datas") //this will set the automatic sync of the page with electron

        this.state = {
            checkedTopics: [],
            checkedQuestions: []
        }
        // ipcRenderer.send("filterData:send")
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
        const filteredData = {
            filteredTopics: this.state.checkedTopics,
            filteredQuestions: []
        }
       this.state.checkedQuestions.map((paper) => {
           const year_Semester = paper.split(" ");
           this.state.filterDatas.activeCourseData.past_questions.map((questionPaper) => {
            console.log(questionPaper)
            if(questionPaper.year === year_Semester[0]){
            questionPaper.question_data.map((questionWrapper) => {
                if(questionWrapper.header.semester === year_Semester[1]) {
                    this.state.checkedTopics.map((topic) => {
                     questionWrapper.questions.map((questionItem) => {
                         if(topic === questionItem.topic) {
                            filteredData.filteredQuestions.push({
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


    if(filteredData.filteredTopics.length > 1 && filteredData.filteredQuestions.length > 1) {
        //this will prevent the person for clicked the filter when nothing is checked
        addfilterData_ipc(filteredData)
        }
        // addFilteredData(filteredQuestions)
        console.log(this.props.gg)
        console.log(filteredData)
        console.log(this.props.gg)
        // this.props.history.push("/")
        
    }
    closeWindow () {
        console.log("close me")
        ipcRenderer.send("close:window")
    }
    componentWillMount() {
        ipcRenderer.on("filter:data", (event, data) => {
            console.log(data)
            this.setState({
                filterDatas: data
            })
        })
    }
    render () {

        let filterPageContent;
        if(this.state.filterDatas) {
        // this.takeMeBack()
        const {activeCourseName, activeCourseData} = this.state.filterDatas
        console.log(activeCourseData)
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
         filterPageContent = (
            <div>
                <h1>Filter Question</h1>
                <h2>{activeCourseName} Topics</h2> 
                {courseTopic}
                <h2>{activeCourseName} question Year</h2>
                {questionYear}
                <button onClick = {this.filterQuestions}>filter</button>
                <button onClick = {this.closeWindow}>Cancel</button>
            </div>
         )           
    } else {
        filterPageContent = ""
    }
    
        return (
           <div>
               {filterPageContent}
           </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    // addFilteredData: (data) => dispatch(addFilteredData(data))
})
export default connect(null, mapDispatchToProps)(filterPage)

// export default connect()(filterPage);