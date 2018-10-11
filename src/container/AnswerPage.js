import React from "react";
const { ipcRenderer } = window.require('electron');

class AnswerPage extends React.Component {
    constructor(props) {
        ipcRenderer.send("sync:answer")
        super(props)
        this.state = {
            answers: ""
        }
    }
    render () {
        return (
            <h1>This is the hearder page</h1>
        )
    }
}

export default AnswerPage