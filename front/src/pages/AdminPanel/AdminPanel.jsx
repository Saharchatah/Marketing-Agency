import React from 'react';
import './AdminPanel.css';

import {Redirect} from 'react-router-dom';
import Header from '../../components/Home_Page/header/header';
import Footer from '../../components/Home_Page/footer/footer';


 import { useHistory } from "react-router-dom";

 class Admin extends React.Component {

    
nav=()=>{
    this.props.history.push('./')
}


    render(){ 


        

        return(
            <div>
                  <header>
                       <Header/>
                   </header>
               <div class="maba3rf">
                 
                    <div class="gray">
                     <h1>welcome</h1> 
         <button class="sa_button" onClick={()=>{this.props.history.push('/UpdateProfile')}}>update profile</button>  
                  
            <button class="sa_button" onClick={()=>{this.props.history.push('/edituser')}}>EDIT USERS</button>  
            <button class="sa_button" onClick={()=>{this.props.history.push('/add')}}>ADD BLOG</button>  
            <button class="sa_button" onClick={()=>{this.props.history.push('/msgs')}}>MESSAGES</button>  
            <button class="sa_button" onClick={()=>{this.props.history.push('/subs')}}>SUBSCRIBERS</button>  
                </div> 
                </div>
                <footer>
                    <Footer/>
                </footer>
                </div>
                
            
        )
    }
 }export default Admin

//  class Admin extends React.Component {

//     onSubmit = () => {
      
//            return  <Redirect  to="/EditUsers" />
       
//     }
  
//     render() {
//       return (
        
//         <div>

//             sahar
//             <button onClick={this.onSubmit}>Login</button>
//         </div>
//         //   
       
//       )
//     }
//   }

//   export default Admin;

// function Admin (){
//     const history = useHistory();


//     function aClickUP(){
       
// history.push("/UpdateProfile");}

// function aClickEU(){
       
//     history.push("/EditUsers");}

//     function aClickEB(){
       
//         history.push("/EditBlogs");}
            
    
//     function aClickSM(){
       
//         history.push("/SeeMessg");}

//         function aClickSS(){
       
//             history.push("/SeeSubs");}

//             return(
        //         <div class="maba3rf">
        //             <div class="gray">
        //              <h1>welcome</h1>
        //  <button class="sa_button" onClick={aClickUP}>update profile</button>  
                  
        //     <button class="sa_button" onClick={aClickEU}>edit users</button>  
        //     <button class="sa_button" onClick={aClickEB}>Edit blogs</button>  
        //     <button class="sa_button" onClick={aClickSM}>see messages</button>  
        //     <button class="sa_button" onClick={aClickSS}>see subscribers</button>  
        //         </div> </div>
//             )
// }
// export default Admin

