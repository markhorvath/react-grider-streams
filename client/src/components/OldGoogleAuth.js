import React from 'react';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: 'GOOGLEAUTH_KEY',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                //we update state.isSignedIn with the boolean value returned by the auth.isSignedIn.get() method
                //references to these Auth methods and more found here https://developers.google.com/identity/sign-in/web/reference
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                //IN THE CONSOLE TRY gapi.auth2.getAuthInstance().isSignedIn.get()
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    };

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };
    //onclick functions for the sign in/out buttons (no parens when invoked on the button so it doesn't get automatically called on render)
    onSignInClick = () => {
        this.auth.signIn();
    };
    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <div>I dont know who signed in</div>;
        } else if (this.state.isSignedIn) {
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

export default GoogleAuth;