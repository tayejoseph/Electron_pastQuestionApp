import React from "react";
import {connect} from "react-redux";


class filterQuestionPage extends React.Component {
    constructor(props) {
        super(props)
    }
    // componentWillReceiveProps(newProps) {

    // }
    componentWillMount (){
        //we need to do the following here
        //send the default window statement to electron
    }
    render () {
        return (
            <div>
                <p>Filter Question</p>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    filterDatas: state.filterQuestionsData
});

export default connect(mapStateToProps, null)(filterQuestionPage)