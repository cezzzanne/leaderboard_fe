import React from 'react'
import Link from 'next/link'
import { Form, FormInput, FormGroup, Button } from "shards-react";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loginForm: false, username: '', password: '', email: '', usernameLogin: '', passwordLogin: '', loading: false,
        teamName: ''};
        this.changeForm = this.changeForm.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.loginForm = this.loginForm.bind(this);
        this.registerForm = this.registerForm.bind(this);
    }

    changeForm() {
        this.setState({loginForm: !this.state.loginForm});
    }

    updateInput(e) {
        const element = event.target;
        const target = element.id;
        const value = element.value;
        this.setState({[target]: value});
    }

    async loginForm() {
        this.setState({loading: true});
        fetch('http://127.0.0.1:8000/api/login',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: this.state.usernameLogin, password: this.state.passwordLogin
                })
            }).then(async (res) => {
            const data = await res.json();
            await localStorage.setItem('userID', data.userID);
            await localStorage.setItem('username', data.username);
            await localStorage.setItem('teamID', data.teamID);
            await localStorage.setItem('teamName', data.teamName);
            this.setState({loading: false});
            window.location.href = '/leaderboard'
        }).catch((error) => {
            this.setState({loading: false});
        });
    }


    async registerForm() {
        this.setState({loading: true});
        fetch('http://127.0.0.1:8000/api/register',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: this.state.username, email: this.state.email, password: this.state.password,
                    teamName: this.state.teamName
                })
            }).then(async (res) => {
            const data = await res.json();
            await localStorage.setItem('userID', data.userID);
            await localStorage.setItem('username', data.username);
            await localStorage.setItem('teamID', data.teamID);
            await localStorage.setItem('teamName', data.teamName);
            this.setState({loading: false});
            window.location.href = '/leaderboard'
        }).catch((error) => {
            this.setState({loading: false});
        });
    }





    render() {
        return (
         <html>
         <head>
             <title>LeaderBoard- ScholarMe</title>
             <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet"
                   integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                   crossOrigin="anonymous" />
         </head>
         <body>
         <div style={{marginTop: '12%'}}>
             <h3 className='text-center'>LeaderBoard - ScholarMe</h3>
         </div>
         <div className="text-center d-flex justify-content-center" style={{marginTop: '4%'}} id="mainForm">

             <Form hidden={this.state.loginForm} style={{maxWidth: '14vw'}}>
                 <FormGroup>
                     <label htmlFor="#username">Username</label>
                     <FormInput onChange={this.updateInput} value={this.state.username} id="username" placeholder="Username" />
                 </FormGroup>

                 <FormGroup>
                     <label htmlFor="#email">Email</label>
                     <FormInput onChange={this.updateInput} value={this.state.email} id="email" placeholder="Email" />
                 </FormGroup>

                 <FormGroup>
                     <label htmlFor="#username">Team Name</label>
                     <FormInput onChange={this.updateInput} value={this.state.teamName} id="teamName" placeholder="Team Name" />
                 </FormGroup>

                 <FormGroup>
                     <label htmlFor="#password">Password</label>
                     <FormInput onChange={this.updateInput} value={this.state.password} type="password" id="password" placeholder="Password" />
                 </FormGroup>
                 <Button onClick={this.changeForm} style={{marginRight: 11}} theme="info">Login</Button>
                 <Button hidden={this.state.loading} onClick={this.registerForm} theme="success">Go</Button>
                 <Button hidden={!this.state.loading} theme="success">
                 <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                 <span className="sr-only">Loading...</span>
                 </Button>
             </Form>

             {/*LOGIN FORM */}

                 <Form hidden={!this.state.loginForm} style={{maxWidth: '14vw'}}>
                     <FormGroup>
                         <label htmlFor="#username">Username</label>
                         <FormInput onChange={this.updateInput} value={this.state.usernameLogin} id="usernameLogin" placeholder="Username" />
                     </FormGroup>
                     <FormGroup>
                         <label htmlFor="#password">Password</label>
                         <FormInput onChange={this.updateInput} value={this.state.passwordLogin} type="password" id="passwordLogin" placeholder="Password" />
                     </FormGroup>

                 <Button onClick={this.changeForm} style={{marginRight: 11}} theme="info">Register</Button>
                     <Button hidden={this.state.loading} onClick={this.loginForm} theme="success">Go</Button>
                     <Button hidden={!this.state.loading} theme="success">
                         <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                         <span className="sr-only">Loading...</span>
                     </Button>
             </Form>
         </div>



         <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
                 integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
                 crossOrigin="anonymous"></script>
         </body>

         </html>

        );
    }
}

export default Index