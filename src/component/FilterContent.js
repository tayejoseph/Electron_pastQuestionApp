import React from "react";
import {connect} from "react-redux";
import {Modal, FormGroup, Checkbox, OverlayTrigger, Button, Tooltip, Popover} from "react-bootstrap";
import {addFilteredData} from "./../actions"

class FilterContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedTopics: [],
            checkedQuestions: []
        }
    }
    topicCheckHandler = (e) => {
        const value = e.target.value ? e.target.value : "" //this will retain the previous value even when the it is unchecked
        if(e.target.checked) { 
        this.setState({
            checkedTopics: [
                ...this.state.checkedTopics,
                   value
            ]
        })
    } else {
        this.setState((prevState) => ({
            checkedTopics: prevState.checkedTopics.filter((topics) => topics !== value) //this will remove the unchecked topic form the array
        }))
    }
    }
    questionCheckHandler = (e) => {
        const value = e.target.value ? e.target.value : ""
        if(e.target.checked) {
        this.setState({
            checkedQuestions: [
                ...this.state.checkedQuestions,
                  value
            ]
        })
    } else {
        this.setState((prevState) => ({
            checkedQuestions: prevState.checkedQuestions.filter((questions) => questions !== value)
        }))
    }
    }
    filterQuestions = () => {
        //U NEED TO RECHECK THE CHECKBOXES THEY ARE HAVING SOME PROBLEMS
       const {checkedTopics, checkedQuestions} = this.state;
       let notFoundMessage = []; //for topics not found I NEED TO CHECK THIS LATER
    //    let inputs = document.getElementsByTagName("input") //I may need to effect this disabling the check box again
    //    console.log(inputs)
        if (checkedTopics.length > 0 && checkedQuestions.length > 0) {
            const filteredQuestions = []
            const filteredTopics = []
        checkedQuestions.map((paper) => {
            const year_Semester = paper.split(" ");
            this.props.activeCourseData.past_questions.map((questionPaper) => {
                if(questionPaper.year === year_Semester[0]){
                questionPaper.question_data.map((questionWrapper) => {
                    if(questionWrapper.header.session === year_Semester[1] && questionWrapper.header.exam === `${year_Semester[3]} ${year_Semester[4]}`) {
                        checkedTopics.map((topic) => {
                        questionWrapper.questions.map((questionItem) => {
                            if(topic === questionItem.topic) {
                                filteredTopics.push(topic)
                                filteredQuestions.push({
                                    questionData: questionItem,
                                    semester_year : paper   
                                }) 
                            } else {
                                //this will contain the section that will write message for past question that do not contain the topic
                            }
                        })
                        
                        })
                    }
                })
            }
            })
        })

        //note u need to do something if the filtered question array is empty
        //note i need to add a tool tip for all the topics so that when ever any user put the cursor on a past question he or she can have an idea of the topic that are available for that question
            if(filteredQuestions.length > 0) { //this check if the topics picked where found in the questions picked before sending it to the state
            this.props.addFilteredData({
                filteredTopics: [...new Set(filteredTopics)],
                filteredQuestions
            })
            this.props.handleFilterModalHide()   
            }
            }
            this.setState({
                checkedQuestions: [],
                checkedTopics: []
            })  
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
    }
    render () {
        console.log(this.props.activeCourseData)
        let content = (
        <React.Fragment>
        <ul id = "topic_content">
        <p>Filter Questions by Topics below</p>
        {this.props.topics.map((topic) => (
            <li><input type = "checkbox" onClick = {this.topicCheckHandler} value = {topic} />{topic}</li>   
        ))
        }
        </ul>
        <ul>
        <p>Pick the Past Questions You Want Your Filtered Questions To Come From</p>
        {this.props.activeCourseData.past_questions.map((pastQuestions) => (
            pastQuestions.question_data.map((pastQuestion) => (
                <li><input type = "checkbox" onClick = {this.questionCheckHandler} value = {`${pastQuestions.year} ${pastQuestion.header.session} session ${pastQuestion.header.exam}`} />
                {`${pastQuestions.year} ${pastQuestion.header.session} session ${ pastQuestion.header.exam}`}
                </li>   

            ))
        ))
        }
        </ul>
        </React.Fragment>
        )
        console.log(this.props.uni_course_info)
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
       <Modal.Title>
       <img src = {this.props.uni_course_info.unilogo} alt = "oau logo" id = "uni_logo" />
       {this.props.uni_course_info.courseDepartment}</Modal.Title>
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
activeCourseData: state.ActivePastQuestionDatas.activeCourseDatas.activeCourseData
})

const mapDispatchToProps = (dispatch, props) => ({
addFilteredData : (data) => dispatch(addFilteredData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterContent);
