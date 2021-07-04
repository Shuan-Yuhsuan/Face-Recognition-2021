import React from 'react';

class Register extends React.Component {
    constructor(props){ // pass the (props) here so that it can be used in the onSubmitSignIn function
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    // to receive the email input by updating the state
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    
    // to receive the password input by updating the state
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    // to receive the name input by updating the state
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    // to send the signin input stored in the state to the backend server
    onSubmitSignIn = () => {
        fetch('https://friendly-chesterfield-45678.herokuapp.com/register', {
            // this is not the default GET request, so we need this second argument
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {     // recall that the server returns the user data when they register
                if (user.id) {     // the backend server returns either a user or an error, check if the response has an id to see if they've registered successfully
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');   // if login successfully, redirect to home page
                }
            })
    }

    render() {
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register"
                            />
                        </div>
                        
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;