import React from "react";

//the signin page will have a create account btn 
class SignInWelcomeArea extends React.Component {
    onSubmit = () => {
        this.props.showPersonAccount()
    }
    render () {
        return (
            <div>
                continue from where you stopped
                <button>Yes/No</button>
            </div>
        )
    }
}

export default SignInWelcomeArea