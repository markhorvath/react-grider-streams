import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {


    //gapi.auth2.getAuthInstance().currentUser.get().getId()  -- Remember, will use later
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: 'gauth
                scope: 'email'
            }).then(() => {
                //after initializing library assign the instance to this.auth
                this.auth = window.gapi.auth2.getAuthInstance();
                //then immediately update our auth state inside of our redux store
                this.onAuthChange(this.auth.isSignedIn.get());
                //then sit and wait (listen) of authetication status to change
                this.auth.isSignedIn.listen(this.onAuthChange);
                //this.onAuth will go to (they're already imported) actions/index.js, which returns the type string
                //which then goes to the reducers/index.js which has authReducer.js execution
                //context which looks for an action.type string and uses switch/case to
                //return a new object of state with a boolean value assigned to it's
                //"isSignedIn" property which is exported as "combineReducers" in reducers/index.js
                //which then exports the value as 'auth'???? COME BACK TO THIS ITS IMPORTANT TO
                //FULLY UNDERSTAND
            })
        });
    };

    //we updated this from this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    //this takes an argument that i belive is part of the auth api and is a boolean value
    //the props are from the action creators
    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };
    //onclick functions for the sign in/out buttons (no parens when invoked on the button so it doesn't get automatically called on render)
    onSignInClick = () => {
        this.auth.signIn();
    };
    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return <div>I dont know who signed in</div>;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Google Sign Out
                </button>
            );
        } else {
                return (
                    <button onClick={this.onSignInClick} className="ui red google button">
                        <i className="google icon" />
                        Google Sign-in
                    </button>
                );
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
    mapStateToProps, { signIn, signOut })
    (GoogleAuth);