import React from 'react';
import styles from './Register.module.css';

import { Link, } from 'react-router-dom';

import { setCookie, removeCookie } from '../../cookie';


class Register extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
        this.validationUsername = this.validationUsername.bind(this);
        this.validationEmail = this.validationEmail.bind(this);

        this.state = {
            username: '',
            email: '',
            pass0: '',
            pass1: '',
           
            msg: '',
            msgu: '',
            msgE: '',
            
            users: {}
        };
    }





    createUser = async () => {
        let { username, email, pass0 } = this.state;
        
        let url = `//localhost:8000/users/create/?name=${username}&email=${email}&password=${pass0}`;

        let paramsErr = "you need at least name or email or password properties to create a contact";
        if (!username || !email || !pass0) throw new Error(paramsErr);

        try {



            const response = await fetch(url);
            const result = await response.json();



            if (result.success) {

                let newUser = result.result;
                console.log(newUser);

                // let stateUsers = [...this.state.users];

                // stateUsers.push({ username, email, pass0 });

                this.setState({username: "", email: "", pass0: "",pass1:'' });

            }
        }
        catch (e) {
    
            throw new Error(e);
        }
    }

    
    async handlesubmit(ev) {
        ev.preventDefault();
        this.signup()
        
        // let passc0 = this.state.pass0;
        // let passc1 = this.state.pass1;
     
        // if (passc0 === passc1 && !await this.validationUsername() && !await this.validationEmail()) {
        //     await this.createUser();
        //     this.props.history.push('/login');
        // } else if (!(passc0 === passc1) || await this.validationUsername()===true || await this.validationEmail()===true) {
        //     this.setState({ msg: 'not matching' });
           
        // }
    }


    validationUsername = async (ev) => {

        let { username } = this.state;
        let url = `//localhost:8000/user/usernameuser/${username}`;
        try {

            const response = await fetch(url);
            const result = await response.json();

            if (result.result) {
                console.log(result.result);
                this.setState({ msgu: `${username} was allready in use` });
            } else {
                this.setState({ msgu: `` });

            }
          
            return result.result;
            
        } catch (e) {

        }
    }

    validationEmail = async (ev) => {

        let { email } = this.state;
        if (!email) return;
        let url = `//localhost:8000/user/emailuserr/${email}`;
        try {

            const response = await fetch(url);
            const result = await response.json();

            if (result.result) {
                this.setState({ msgE: `${email} was allready in use` });
            } else {
                this.setState({ msgE: `` });

            }
            
            return result.result;
        } catch (e) {

        }
    }


    signup = async () => {
        const { username, email, pass0 } = this.state;
        try {
            const url = 'http://localhost:8000/signup';
            const body = JSON.stringify({ username, email, pass0 });
            const headers = { 'Content-Type': 'application/json' };

            const response = await fetch(url, { method: "POST", headers, body });
            const answer = await response.json();
            if (answer.success) {
                // answer.result: id, token, name, email
                let user = answer.result;
              //  this.props.onLogin(user);
                console.log(user.id);
                console.log(`successful signup`);

                // now set the cookie
                setCookie('id', user.id, 30);
                console.log(setCookie('id', user.id, 30))
                setCookie('token', user.token, 30);
                this.props.history.push('/');
            } else {
                this.setState({ error_message: answer.message });

            }
        } catch (err) {
            this.setState({ error_message: err.message });

        }
    };


    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state);

    }




    render() {

        document.body.style.textAlign = "center";
        let { pass0, pass1, username, email } = this.state;
        return (

            <div className={styles.Container_1}>

                <div className={styles.title_section} >

                    <div className={styles.img_div}>

                        <img className={styles.img_logo} src="images/logo.png" alt="error" />

                    </div>

                    <div>
                        <h5> Sign Up To Market Hub </h5>
                    </div>

                </div>

                <div className={styles.Register_section}>

                    <form onSubmit={this.handlesubmit}>

                        <div>
                            <label className={styles.label_reg} For="Uname">Username : </label>
                            <input onBlur={this.validationUsername} onChange={this.handleChange} name='username' value={username} className={styles.input_reg} type="text" id="Uname" placeholder=" Your name " minlength="5" required />
                            <div className={styles.error_msg}>{this.state.msgu}</div>
                        </div>

                        <div>
                            <label className={styles.label_reg} For="email">Email :</label>
                            <input onBlur={this.validationEmail} onChange={this.handleChange} name='email' value={email} className={styles.input_reg} type="email" id="email" placeholder=" Your Email " required />
                            <div className={styles.error_msg}>{this.state.msgE}</div>
                        </div>

                        <div>
                            <label className={styles.label_reg} For="password">Password :</label>
                            <input className={styles.input_reg} name="pass0"
                                value={pass0}
                                onChange={this.handleChange} type="password"
                                id="password" placeholder=" Your Password "
                                minlength="8" required />
                        </div>

                        <div>
                            <label className={styles.label_reg} For="password_conf">Confirm Password :</label>
                            <input className={styles.input_reg}
                                name="pass1" value={pass1}
                                onChange={this.handleChange} type="password" id="password_conf"
                                minlength="8" placeholder=" Confirmation " required />
                        </div>

                        <div className={styles.error_msg}>{this.state.msg}</div>

                        <div>

                            <input className={styles.btn} type="submit" value="Sign Up" />

                        </div>

                        <div>

                            <p>Already With Us? <Link className={styles.alink} to="/login">Sign In</Link></p>




                        </div>

                    </form>



                </div>

            </div>




        );



    }
}


export default Register;
