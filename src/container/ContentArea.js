import React from "react"
import {connect} from "react-redux";

class ContentArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propsReceived: false,
            header: "Welcome To The PastQuestion App",
        }
    }
    componentWillReceiveProps (newProps) {
        console.log(newProps)
        const {header, questions} = newProps.questionData;
        this.setState({
                    propsReceived: true,
                    header,
                    questions                    
                })
                console.log(header, questions)
    }
    render () {
        let content;
        let gg;


        if (this.state.propsReceived) {
            console.log(this.state.header)
            const {schoolName, semester} = this.state.header;
            const questions = this.state.questions
            content = (
                <hgroup>
                <h1>{schoolName}</h1>
                <h2>{semester}</h2>
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
    questionData: state.activeCourse.activeQuestionData.questionData
})
export default connect(mapStateToProps, null)(ContentArea);