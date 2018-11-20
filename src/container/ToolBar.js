import React from "react";
import {connect} from "react-redux";
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, ButtonToolbar, FormGroup, FormControl} from "react-bootstrap";


class ToolBar extends React.Component {
constructor(props) {
    super(props);
    console.log(props.enableBtn)
}
openUploadHandler = () => (
    this.props.showUpload()
)
feedBackHandler = () => (
    this.props.showFeedBack()
)
downloadHandler = () => (
    this.props.showDownload()
)

modalClickHandler = (e) => {
    if(e.target.innerHTML === "Answer") {
        this.props.handleAnswerModal()
    } else {
        this.props.handleFilterModal()
    }
}
signInHandler = () => (
    this.props.showSignInArea()
)
modeChangeHandler = (e) => {
    this.props.handleModeChange(e.target.value)
//i need to set the value to test mode when ever the side bar btn is click
}


// WHEN THE USER IS LOGGED IN YOU SHLD BE ABLE TO ADD A SETTING BTN WHERE THE USER CAN ADD QUESTION FOR HIS ACCOUNT AND 
render () {
    return (
            <Navbar fixedTop>  
            <Navbar.Form>
                <Button onClick = {this.modalClickHandler} disabled = {this.props.enableBtn}>Answer</Button>
                <Button onClick = {this.props.toggleContentSolution} disabled = {this.props.enableBtn}>Solution</Button>
                <Button onClick = {this.modalClickHandler} disabled = {this.props.enableBtn}>Filter</Button>
                <select disabled = {this.props.enableModeBtn}
                onChange = {this.modeChangeHandler} defaultValue = "Test">
                <option value="Test">Test Mode</option>
                <option value="Exam">Exam Mode</option>
                </select>
                {/* if this the props. signInData exist the this commented code below will start working */}
                {/* All this commented code will be active once the user submit and create and account */}
                {/* <Button onClick = {this.timerClick}>Timer</Button> */}
                <Button onClick = {this.openUploadHandler}>Upload</Button>
                <Button onClick = {this.signInHandler}>Signin/Login</Button>
                <Button onClick = {this.feedBackHandler}>FeedBack</Button>
                {this.props.currentQuestionData.uni_info ? <Button onClick = {this.downloadHandler}>Download</Button> : ""}
            </Navbar.Form>
            </Navbar>
    )
}
}

const mapStateToProps = (state, props) => ({
    currentQuestionData: state.ActivePastQuestionDatas.currentQuestionData
})
export default connect(mapStateToProps, null)(ToolBar);