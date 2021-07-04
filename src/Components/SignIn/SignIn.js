import React from 'react';

// Since we need to process the signin procedure, we turned this component into a child REACT app
class SignIn extends React.Component{
    constructor(props){ // pass the (props) here so that it can be used in the onSubmitSignIn function
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    // to receive the email input by updating the state
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    
    // to receive the password input by updating the state
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    // to send the signin input stored in the state to the backend server
    onSubmitSignIn = () => {
        fetch('https://friendly-chesterfield-45678.herokuapp.com/signin', {
            // this is not the default GET request, so we need this second argument
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {  // does the user exist? Did we receive a user with a property of id?
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');   // if login successfully, redirect to home page
                }
            })
    }

    render(){   // render() is a required syntax of REACT component
        const { onRouteChange } = this.props;   // to receive the onRouteChange function/props from the parent file
        return(
            // the container card borrowed from https://tachyons.io/components/cards/product-card/index.html
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                {/* the sign in form borrowed from https://tachyons.io/components/forms/sign-in/index.html */}
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}   // to pass the Email input to the state
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}   // to pass the Password input to the state
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}   // call the onSubmitSignIn function defined above
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );    
    }
    
}

export default SignIn;