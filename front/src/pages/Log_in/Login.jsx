import React, { Component } from 'react';

import styles from './login.module.css';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../components/Home_Page/header/header'
import Footer from '../../components/Home_Page/footer/footer'
import { setCookie, removeCookie } from '../../cookie';




class login extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
        this.state = {
            name: '',
            password: '',
            msg: ''
        }
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state);
    }

    login = async () => {
        const { name, password } = this.state;
        try {
            const url = 'http://localhost:8000/login';
            const body = JSON.stringify({ name, password });
            const headers = { 'Content-Type': 'application/json' };

            const response = await fetch(url, { method: "POST", headers, body });
            const answer = await response.json();


            if (answer.success) {

                // answer.result: id, token, name, nickname
                // this.props.onLogin(answer.result);
              //  console.log( this.props.onLogin(answer.result));
                // now set the cookie
                setCookie('id', answer.result.id, 30);
                setCookie('token', answer.result.token, 30);
                this.props.history.push('/')
            } else {
                this.setState({ error_message: answer.message });
           
            }
        } catch (err) {
            this.setState({ error_message: err.message });
 
        }
    };

    validate = async () => {
        let { name, password } = this.state;
        let url = `http://localhost:8000/user/check/${name}/${password}`
        try {

            let response = await fetch(url);
            let result = await response.json();
            console.log(result.result);
            return result.result;
        } catch (e) {

        }
    }
    componentDidMount(){
        
    }
    async handlesubmit(ev) {
        ev.preventDefault();
        this.login()
       


        if (await this.validate()) {
            this.props.history.push('/');
            return;
        } else {
            this.setState({ msg: 'wrong name and password' });
        }
        return;
     }

    render() {
        document.body.style.textAlign = "center";
        let { name, password,msg } = this.state;
        return (

            <div className={styles.Container_1}>
<Header/>
                <div class={styles.title_section} >

                    <div class={styles.img_div}>
                        <img class={styles.img_logo} src="images/logo.png" alt="error" />
                    </div>

                    <div>
                        <h5>Sign In To Market Hub </h5>
                    </div>

                </div>

                <div class={styles.login_section}>

                    <form onSubmit={this.handlesubmit}>

                        <div>

                            <label className={styles.label_log} For="Uname">name : </label>
                            <input  onChange={this.handleChange} name='name' value={name} className={styles.input_log} type="text" id="Uname" placeholder=" Your name " required />
                        </div>
                        <div>
                            <label className={styles.label_log} For="password">Password :</label>
                            <input onChange={this.handleChange} name='password' value={password} className={styles.input_log} type="password" id="password" placeholder=" Your Password " required />
                        </div>
                        <div>
                            <label className={styles.msg} name='msg'>{msg}</label>
                        </div>
                        <div>

                            <input class={styles.btn} type="submit" value="Sign in" />

                        </div>

                        <div>

                            <p>New To Us? <Link className={styles.a} to="/Register">Sign Up</Link></p>
                        </div>

                    </form>

                </div>


            </div>



        );
    }

}

export default login;
