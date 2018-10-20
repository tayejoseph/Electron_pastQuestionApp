import React from "react";
import {connect} from "react-redux";
import {Modal, OverlayTrigger, Button, Tooltip, Popover} from "react-bootstrap";

class FilterContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedTopics: [],
            checkedQuestions: []
        }
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
    questionCheckHandler = (e) => {
        console.log(e.target.value)
        this.setState({
            checkedQuestions: [
                ...this.state.checkedQuestions,
                   e.target.value
            ]
        })
    }
    filterQuestions = () => {
        let inputs = document.getElementsByTagName("input")
      
        const filteredData = {
            filteredTopics: this.state.checkedTopics,
            filteredQuestions: []
        }
        console.log(this.state.checkedQuestions)
       this.state.checkedQuestions.map((paper) => {
           const year_Semester = paper.split(" ");
           this.props.activeCourseData.past_questions.map((questionPaper) => {
            console.log(questionPaper)
            console.log(year_Semester[0])
            if(questionPaper.year === year_Semester[0]){
            questionPaper.question_data.map((questionWrapper) => {
                console.log(year_Semester[1])
                console.log(questionWrapper.header.semester)
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


    if (filteredData.filteredTopics.length > 0 && filteredData.filteredQuestions.length > 0) {
        console.log(filteredData)
          Array.from(inputs, (input) => {
            input.checked = false
        })
        //this will prevent the person for clicked the filter when nothing is checked
        // ipcRenderer.send("filtered:questions", filteredData);
        // ipcRenderer.send("close:window")
        this.setState({
            checkedQuestions: [],
            checkedTopics: []
        })  
        filteredData.filteredTopics = [];
        filteredData.filteredQuestions = [];      
        }
    }
    closeWindow () {
        //u need to work very well in the unchecking th check btn its not wrking fine
        let inputs = document.getElementsByTagName("input")
         this.setState({
            checkedQuestions: [],
            checkedTopics: []
        })
        Array.from(inputs, (input) => {
            input.checked = false
        })
        // ipcRenderer.send("close:window")
    }
 
    render () {
        let content = (
        <React.Fragment>
        <ul id = "topic_content">
        {this.props.topics.map((topic) => (
            <li><input type = "checkbox" onClick = {this.topicCheckHandler} value = {topic} />{topic}</li>   
        ))
        }
        </ul>
        <ul>
        {this.props.questionYears.map((data) => (
            //i need to know here to add the semester if it is rain or harmattan
            <li><input type = "checkbox" onClick = {this.questionCheckHandler} value = {`${data.year} ${data.semester_exam}`} />{`${data.year} ${data.semester_exam}`}</li>   
        ))
        }
        </ul>
        </React.Fragment>
        )
    return (
        <Modal 
           keyboard
           backdrop = "static"
           animation = {false} 
           bsSize="lg" 
           show={this.props.filterModal} 
           onHide={this.props.handleFilterModalHide}
       >
       <Modal.Header closeButton>
       <Modal.Title>Modal heading</Modal.Title>
       </Modal.Header>
       <Modal.Body>
       {content}
       </Modal.Body>
       <Modal.Footer>
        <Button onClick = {this.filterQuestions}>Filter</Button>
       <Button onClick={this.props.handleFilterModalHide}>Close</Button>
       </Modal.Footer>
       </Modal>
        )
        
    }
}

const mapStateToProps = (state, props) => ({
topics: state.ActivePastQuestionDatas.activeCourseDatas.activeCourseTopics,
questionYears: state.ActivePastQuestionDatas.activeCourseDatas.activeCourseYears,
activeCourseData: state.ActivePastQuestionDatas.activeCourseDatas.activeCourseData

})

const mapDispatchToProps = (dispatch, props) => ({
// addFilteredData : (data) => dispatch(addFilteredData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterContent);
