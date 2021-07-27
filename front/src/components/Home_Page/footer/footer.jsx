import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './footer.module.css';
import { setCookie, removeCookie, getCookie } from '../../../cookie';


import { Link } from 'react-router-dom';




export default class Footer extends React.Component {


state={
  email:''
}

getEmail=async()=>{
  let idus=getCookie('id');
  const url = `http://localhost:8000/user/get/${idus}`;
  const response = await fetch(url);
  const answer = await response.json()
  let email=answer.result.email;
  this.setState({email})
}

  InsertSubscriber = async () => {
    let idus=getCookie('id');
  
    let url = `localhost:8000/Subscribe/create/?UserId=${idus}`;
 
    try {
        const response = await fetch(url);
        const result = await response.json();
  
        if (result.success) {
          
            // this.setState({username:"",lastname:"",email:"",depatment_hearing: "",department:"",messages:"",subject:"" });
        }
    }
    catch (e) {
        throw new Error(e);
    }
  }


  render() {

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

                <Link to='get_in_touch' class="nav-link" ID="home">CONTACT US</Link>

              </li>
              <li class="nav-item">
                <Link to='/about' class="nav-link" ID="upda1"  >ABOUT US</Link>

              </li>

              <li class="nav-item">

                <Link class="nav-link" ID="register_info" onClick={this.InsertSubscriber} > SUBSCRIBE</Link>

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


