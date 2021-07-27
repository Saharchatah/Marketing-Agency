import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './header.module.css';
import { setCookie, removeCookie, getCookie } from '../../../cookie';

// import './header.css';

import { Link } from 'react-router-dom';




export default class header extends React.Component {



  state = {
    admin: false,
    user: { token: null }
  }


  handleLogout = async () => {
    try {
      const url = "http://localhost:8000/logout";
      const headers = {
        'Content-Type': 'application/json',
        id: getCookie('id'),
        token: getCookie('token')

      };
      console.log({headers})

      const response = await fetch(url, { method: "POST", headers });
      const answer = await response.json();
      console.log(answer)
      // if (answer.sucssess) {
      this.props.onLogout();
      removeCookie('id');
      removeCookie('token');
      // } else {
      // }
    } catch (err) {

    }
  };

componentDidMount(){
  this.isAdmin()
}

  isAdmin = async (ev) => {
    let id = getCookie('id');


    if (!id) return;
    let url = `http://localhost:8000/user/isAdmin/${id}`;
    try {

        const response = await fetch(url);
        const result = await response.json();
        if (result.result) {
            this.setState({ admin: true })
        }


    } catch (e) {

    }
}

  render() {
   
let{admin}=this.state;
console.log(admin)
    document.body.style.textAlign = "center";
    let id = getCookie('id');

    return (
      <header>

        <nav className={styles.nav0 + " navbar navbar-expand-lg navbar-light "}>

          <a class="navbar-brand" href="#"> <img className={styles.img} src="images/logo.png" alt="" /> </a>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

            <span class="navbar-toggler-icon"></span>

          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <ul class=" navbar-nav ml-auto ">

              <li class="nav-item">

                <Link to='/' class="nav-link" ID="home" >HOME</Link>

              </li>
              <li class="nav-item">
                <Link to='/about_us' class="nav-link" ID="upda1"  >ABOUT US</Link>

              </li>

              <li class="nav-item">

                <Link to='/blogs' class="nav-link" ID="register_info"> BLOG </Link>

              </li>


              <li class="nav-item">
                <Link to='/get_in_touch' class="nav-link" ID="register_info"> GET IN TOUCH </Link>

              </li>


              <li class="nav-item" className={styles.DA_Li_Log}>
                {id ? (
                  <Link  class="nav-link" ID="register_info" to='/myaccount'  > MY ACCOUNT </Link>
                ) : (
                  <Link to='/login' class="nav-link" ID="register_info">LOG in</Link>
                )}
              </li>

              <li class="nav-item" className={styles.DA_Li_Log}>
                {(id && admin) ? (
                  <Link  class="nav-link" ID="register_info" to='/adminpanel'  > ADMIN PANEL </Link>
                ) : (
                 <p></p>
                )}
              </li>


            </ul>

          </div>
        </nav>
      </header>
    )


    if (id) {
      return (
        <header>

          {/* <div class="container-fluid  bgg"> */}

          <nav className={styles.nav0 + " navbar navbar-expand-lg navbar-light "}>

            <a class="navbar-brand" href="#"> <img className={styles.img} src="images/logo.png" alt="" /> </a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

              <span class="navbar-toggler-icon"></span>

            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

              <ul class=" navbar-nav ml-auto ">

                <li class="nav-item">

                  <Link to='/' class="nav-link" ID="home" >HOME</Link>

                </li>
                <li class="nav-item">
                  <Link to='/about_us' class="nav-link" ID="upda1"  >ABOUT US</Link>

                </li>

                <li class="nav-item">

                  <Link to='/blogs' class="nav-link" ID="register_info"> BLOG </Link>

                </li>


                <li class="nav-item">
                  <Link to='/get_in_touch' class="nav-link" ID="register_info"> GET IN TOUCH </Link>

                </li>


                <li class="nav-item">

                  <Link onClick={this.handleLogout} class="nav-link" ID="register_info"  > LOG OUT </Link>

                </li>


              </ul>

            </div>
          </nav>

          <div class="row">

            {/* <div class="col-lg-12">
    
     <h1>Learn new Thing every day .</h1>
     <p> our community is to build new capability </p>
     <p>and make your street to succsees much easier </p>
     <br/>
     <br/>
    
    </div> */}


          </div>


          {/* </div> */}



        </header>
      )
    } else {
      return (

        <header>

          {/* <div class="container-fluid  bgg"> */}

          <nav className={styles.nav0 + " navbar navbar-expand-lg navbar-light "}>

            <a class="navbar-brand" href="#"> <img className={styles.img} src="images/logo.png" alt="" /> </a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

              <span class="navbar-toggler-icon"></span>

            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

              <ul class=" navbar-nav ml-auto ">

                <li class="nav-item">

                  <Link to='/' class="nav-link" ID="home" >HOME</Link>

                </li>
                <li class="nav-item">
                  <Link to='/about_us' class="nav-link" ID="upda1"  >ABOUT US</Link>

                </li>

                <li class="nav-item">

                  <Link to='/blogs' class="nav-link" ID="register_info"> BLOG </Link>

                </li>


                <li class="nav-item">
                  <Link to='/get_in_touch' class="nav-link" ID="register_info"> GET IN TOUCH </Link>

                </li>


                <li class="nav-item">

                  <Link to='/login' class="nav-link" ID="register_info"  > LOG in  </Link>

                </li>


              </ul>

            </div>
          </nav>

          <div class="row">

            {/* <div class="col-lg-12">

 <h1>Learn new Thing every day .</h1>
 <p> our community is to build new capability </p>
 <p>and make your street to succsees much easier </p>
 <br/>
 <br/>

</div> */}


          </div>


          {/* </div> */}



        </header>


      );
    }
  }
}


