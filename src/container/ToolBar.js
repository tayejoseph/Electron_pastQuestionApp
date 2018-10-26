import React from "react";
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
modeChangeHandler = (e) => {
    this.props.handleModeChange(e.target.value)
//i need to set the value to test mode when ever the side bar btn is click
}



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
                <Button onClick = {this.timerClick}>Timer</Button>
                <Button onClick = {this.downloadHandler}>Download</Button>
                <Button onClick = {this.openUploadHandler}>Upload</Button>
                <Button onClick = {this.feedBackHandler}>FeedBack</Button>
            </Navbar.Form>
            </Navbar>
    )
}
}

export default ToolBar;