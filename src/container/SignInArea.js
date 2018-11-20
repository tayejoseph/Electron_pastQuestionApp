import React from "react";

//the signin page will have a create account btn 
class SignInArea extends React.Component {
    onSubmit = () => {
        console.log("Sdsdsd")
        this.props.showPersonAccount()
    }
    render () {
        return (
            <div>
            <button>Create and Account</button>
            <form onSubmit = {this.onSubmit}>
                <div>
                    <label>Enter Your User name</label>
                    <input type = "text" />
                </div>
                <div>
                    <label>Enter Your Pass World</label>
                    <input type = "text" />
                </div>
                <button type = "submit">Submit</button>
            </form>
            </div>

        )
    }
}

export default SignInArea