import React from "react";
import Dropzone from "react-dropzone";

class UploadPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schoolName: "",
            course_subject: "",
            PastQuestion_year: "",
            Semester: "",
            email: ""
        }
        this.schoolNameHandler = this.schoolNameHandler.bind(this)
        this.course_subjectHandler = this.course_subjectHandler.bind(this)
        this.PastQuestion_yearHandler = this.PastQuestion_yearHandler.bind(this)
        this.SemesterHandler = this.SemesterHandler.bind(this)
        this.emailHandler = this.emailHandler.bind(this)
        this.uploadHandler = this.uploadHandler.bind(this)
        this.cancelHandler = this.schoolNameHandler.bind(this)
    }
    schoolNameHandler(e) {
        this.setState({
            schoolName: e.target.value
        })
    }
     course_subjectHandler(e) {
        this.setState({
            course_subject: e.target.value
        })
    }
     PastQuestion_yearHandler(e) {
        this.setState({
            PastQuestion_year: e.target.value
        })
    }
     SemesterHandler(e) {
        this.setState({
            Semester: e.target.value
        })
    }
     emailHandler(e) {
        this.setState({
            email: e.target.value
        })
    }
    onDrop = (file) => {
        console.log(file)
        if (file.length) {
        // ipcRenderer.send("upload:image", file)
        }
    }
    uploadHandler() {
        // ipcRenderer.send("upload:total")
        //this will confirm that all the files have been upload to the electron side of the app
    }
    cancelHandler () {
        // ipcRenderer.send("close:uploadWindow")
    }
    renderChildren ({ isDragActive, isDragReject }) {
        if (isDragActive) {
            return <h4 className = "drop-message">Drop the image here</h4>
        } else if (isDragReject) {
            return <h4 className = "drop-message">Wrong Image Format</h4>
        }
        else {
            return <h4 className = "drop-message">Drag and drop your past question image here, or click to select.</h4>
        }
        
    }
    render () {
        return (
            <div id = "UploadPage">
            <h1>sadfssadfs</h1>
            <form>
            <div className = "input-group">
                <label>School Name:  </label>
                <input type = "text"
                value = {this.state.schoolName}
                onChange = {this.schoolNameHandler} />
            </div>
            <div className = "input-group">
                <label>Course/Subject  </label>
                <input type = "text" 
                value = {this.state.course_subject}
                onChange = {this.course_subjectHandler}/>
            </div>
            <div className = "input-group">
                <label>PastQuestion year  </label>
                <input type = "text" 
                value = {this.state.PastQuestion_year}
                onChange = {this.PastQuestion_yearHandler}/>
            </div>
            <div className = "input-group">
                <label>Semester </label>
                <input type = "text" 
                value = {this.state.Semester}
                onChange = {this.SemesterHandler}/>
            </div>
            <div className = "input-group">
            <label>Email </label>
            <input type = "text" 
                value = {this.state.email}
                onChange = {this.emailHandler}/>
            </div>
            <div className = "input-group">
            <label>Upload Your Files(image file)</label>
            <Dropzone
            onDrop = {this.onDrop}
            // multiple
            accept = "image/*"
            // className = ""
            // activeClassName = ""
            // rejectClassName = ""
            >
            {this.renderChildren}
            </Dropzone>
            </div>

            <button onClick = {this.uploadHandler}>Upload</button>
            <button onClick = {this.cancelHandler}>Cancel</button>
            </form>
            </div>
        )
    }
}

export default UploadPage;