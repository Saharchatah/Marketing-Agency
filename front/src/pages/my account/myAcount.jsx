import React, { Component } from 'react';
import Header from '../../components/Home_Page/header/header';
import Footer from '../../components/Home_Page/footer/footer';
import './myAccount.css'
import style from '../../components/Getin_touch/Getin3/getin3.module.css';

import { setCookie, removeCookie, getCookie } from '../../cookie';


export default class myAccount extends React.Component {

  state = {
    user: { token: null },
    password:'',
    email:''
  }

  handleLogout = async () => {
   
    const url = "http://localhost:8000/logout";
    const headers = {
      'Content-Type': 'application/json',
      id: getCookie('id'),
      token: getCookie('token')
    };
    try {
      const response = await fetch(url, { method: "POST", headers });
      const answer = await response.json();
    
    } catch (e) { }
       removeCookie('id');
    removeCookie('token');
   
    //this.props.onLogout();
    this.props.history.push('/');
  
  };

  remove=async()=>{
   
  }

  render() {
    let id = getCookie('id');
    return (
      <div>
        <header>
         <Header/>
         </header>
            <div className={style.FAform} >
 
                {/* <form  onSubmit={this.handlesubmit}> */}
                    <table>
             
                  
              
                <tr>
                <input className="FA_button_logout"  type="button"  value='Log Out' onClick={this.handleLogout}/>
                </tr>
                </table>
                {/* </form> */}
                </div>
                <div className='FixFooter' >
             
                </div>

    
        
      </div>
    );
  }
}


