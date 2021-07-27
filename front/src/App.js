import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter } from "react-router-dom";
//pages
import React, { Component } from 'react';
import { setCookie, removeCookie, getCookie } from './cookie';

import Login from './pages/Log_in/Login';
import Edit_blog1 from '../src/components/FABlogHome/FABlogHome';



import get_in_touch from './pages/get_in_touch/get_in_touch';
import EditUsers from './pages/EditUsers/EditUsers';


import Admin from './pages/AdminPanel/AdminPanel';
import Subs from './pages/SeeSubs/SeeSubs';
import Msgs from './pages/Msgs/Msgs'

import Prof from './pages/UpdateProfile/UpdateProfile';


import Register from './pages/Register/Register';
import Home_page from './pages/Home_Page/Home_page';
import About from './pages/about_us/about_us';
import Add_blog from './pages/Add_blog/Add_blog';
import Blogs from './pages/Blogs/Blogs';
import Blog from './pages/blog1/blog1';
import MyAccount from './pages/my account/myAcount'


import Test from './components/FABlogHome/FABlogHome';


import about_us from './pages/about_us/about_us';


//import { Router } from '../../back/src/app';




class App extends React.Component {

  state = {
    user: {
      id: null,
      admin: false,
      token:''
    }
  }


  onLogin = (user) => {
    this.setState({ user });

  }


  onLogout = () => {
    this.setState({ user: { token: null } });
  }


  async componentDidMount() {
    let id = getCookie('id');
    let token = getCookie('token');
    if (id && token) {
      let headers = { 'Content-Type': 'application/json', id, token };
      let response = await fetch('//localhost:8000/getUserData', { headers });
      let data = await response.json();
     
     // if (data.success) {
        this.setState({ user: data.result });
        console.log(this.state.user);
     // }
    }
  }



  render() {
   
    let { user } = this.state;
    console.log(user)
    let token = getCookie('token');
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home_page} />
          <Route path="/login" render={props => {
            return token ? <Redirect {...props} to="/" /> : (
              <Login
                {...props}
                user={user}
                onLogin={this.onLogin}
              />)
          }} />
          <Route path="/about" component={About} />


          <Route path="/myaccount"
            render={(props) => {
              return !token ? <Redirect {...props} to="/" /> : (
                <MyAccount
                  {...props}
                  user={user}
                  onLogin={this.onLogon}
                />)
            }}
          />




          <Route path="/get_in_touch" component={get_in_touch} />
          <Route path="/subs" component={Subs} />
          <Route path="/prof" component={Prof} />
          <Route path="/msgs" component={Msgs} />
          <Route path="/edituser" component={EditUsers} />


       

          <Route path="/Register" component={Register} />
          <Route path="/test" component={Test} />
          <Route path="/about_us" component={about_us} />
          <Route path="/bbbb" component={Edit_blog1} />

          <Route path="/adminpanel" component={Admin} />

{/* 
          <Route path="/adminpanel" render={props => {
            return !user.admin ? <Redirect {...props} to="/" /> : (
              <Admin
                {...props}
                user={user}
                onLogin={this.onLogin}
              />)
          }} /> */}


          <Route path="/Blogs" component={Blogs} />
          <Route path="/blog/:id" component={Blog} />
          <Route path="/add" component={Add_blog} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
