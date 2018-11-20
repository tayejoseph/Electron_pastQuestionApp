import React from "react";
import {Modal, Button} from "react-bootstrap";

const AnswerContent = (props) => {
        console.log(props)
        const {uni_title, semester, exam, course_name, courseDepartment, course_title, year} = props.uni_course_info;
        let content = (
            <div>
            <hgroup>
            <h2>{uni_title}</h2>
            <h2>{courseDepartment}</h2>
            {props.answerData.filteredTopics ? <h2>Filtered Questions for {course_name}</h2> : "" }
            <h2>{course_name} - {course_title}</h2>
            {props.answerData.filteredTopics ? props.answerData.filteredTopics.length < 1 ? <h2>{year} {semester} {exam} Answers</h2> : "" : ""}
            {props.answerData.filteredTopics ? props.answerData.filteredTopics.length >= 1 ? (<h3>Filtered Topics: {
                props.answerData.filteredTopics.map((topic, index) => (
                    <span key = {index}>
                    {
                    (props.answerData.filteredTopics[props.answerData.filteredTopics.length -1] === topic) ? (
                        <span>{topic} .</span>
                    ) : (
                        <span>{topic}, </span>
                    )
                    }
                </span>
                ))
            }</h3>) : "" : "" }
            </hgroup>
            {props.answerData.answersData.map((answer, index) => (
                <div key = {index}>
                {props.answerData.filteredTopics ? <p>{answer.semester_year}</p> : "" }
                <p><span style = {{"marginRight": "10px"}}>{answer.num}. </span>{answer.answer}</p>
                </div>
            ))
            }
            </div>
        )
        return (
 <Modal 
    keyboard
    backdrop = "static"
    animation = {false} 
    bsSize="lg" 
    show={props.answerModal} 
    onHide={props.handleAnswerModalHide}
>
<Modal.Header closeButton>
<Modal.Title>Modal heading</Modal.Title>
</Modal.Header>
<Modal.Body>
{content}
</Modal.Body>
<Modal.Footer>
<Button onClick={props.handleAnswerModalHide}>Close</Button>
</Modal.Footer>
</Modal>
            )
    }



export default AnswerContent;