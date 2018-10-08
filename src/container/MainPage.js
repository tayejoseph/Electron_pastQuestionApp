import React from "react";
import ToolBar from "./ToolBar"
import SideBar1 from "./SideBar1";
import SideBar2 from "./SideBar2";
import ContentArea from "./ContentArea"

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSolution: false,
        }
   }
   modeChangeHandler = (value) => {
    //this will disable the remove the solutions whenever the Exam mode is on
    this.setState({
            showSolution: value,
        })
    }
   toggleSolution = () => {
    if(this.state.showSolution) {
        this.setState({
            showSolution: false
        })
    } else {
        this.setState({
            showSolution: true
        })
    }
    }
    propsToFilterPage = () => {
        this.props.history.push("/filterPage")
    }
    render() {

        return (
            <div>
            <ToolBar filterPage = {this.propsToFilterPage} modeChangeHandler = {this.modeChangeHandler} toggleContentSolution = {this.toggleSolution}/>
            <div id = "mainSection">
            <SideBar1 />
            <ContentArea showSolution = {this.state.showSolution} />
            {/* <SideBar2 /> */}
            </div>
            </div>
        )
    }
}

export default MainPage;