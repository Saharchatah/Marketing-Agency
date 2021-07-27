import React from 'react'
import './Msgs.css'
import Header from '../../components/Home_Page/header/header'
import Footer from '../../components/Home_Page/footer/footer'

import deletemsgggs from './trash.png'

class Msgs extends React.Component{


    state={
        mssgs:[]
      
          }

          async componentDidMount() {
            await this.getmssgss();
           await this.deletemssg ();
          }

    getmssgss = async () => {
        try {
          const response = await fetch('//localhost:8000/messages');
          const result = await response.json();
          console.log(result);

          
        
    if (result.success) {

          this.setState({ mssgs: result.result })
         

          
      }  else {
          this.setState({ error: result.message });}
    
        } catch (error) {
          this.setState({ error })
        }
        
      }
    
     
       



      deletemssg = async (id) => {
        try {
    //this line delete the contact from the sever
          const response = await fetch(`//localhost:8000/messages/delete/${id}`);
          const result = await response.json();
    
          if (result.success) {
    //this line delete the contact from the client side l browser
            let statemssgs = [...this.state.mssgs].filter(mssg => mssg.id != id);

            // let sss = [...this.state.mssgs].map(mssg => mssg.id);
            // this.setState({ id: sss });
            this.setState({ mssgs: statemssgs });
    
          } else this.setState({ error: result.message });
    
        } catch (err) {
          this.setState({ error_message: err })
        }
      }

     
      

    render(){

        let{mssgs, deletemssg}=this.state;
console.log(mssgs)
      // console.log(this.state.id);
        // console.log(this.state.mssgs);
        return(
<div>
  <header>
    <Header/>
  </header>
            <div class="allpagee">
            

              {mssgs.reverse().map(mssg => (
         
         <div  key={mssg.id}>
       
          {/* <p class="mymessg"><div class="shijdid"><b>Name: </b>{mssg.name}<br/> <b>Email: </b>{mssg.email} <br/></div> <br/><b>Title: </b>{mssg.mesgTitle}<br/> <b>Hearing: </b>{mssg.hearing}<br/><b>Department: </b>{mssg.department} <br/><b class="vc">Message Content</b><br/> <div class="mymc">{mssg.messageContent}</div> <br/> <button class="bb" onClick={() => this.deletemssg(mssg.id)}>delete x</button></p> */}
         

          <p class="mymessg"><div class="shijdid"><b>Name: </b>{mssg.name}<br/> <b>Email: </b>{mssg.email} <br/></div> <br/><b>Title: </b>{mssg.mesgTitle}<br/> <b>Hearing: </b>{mssg.hearing}<br/>
          <b>Department: </b>{mssg.department} <br/><b class="vc">Message Content</b><br/> <div class="mymc">{mssg.messageContent}</div>
           <br/> <button class="bb"  onClick={() => this.deletemssg(mssg.id)}></button></p>

          <br/>      

          
          </div> ))} 
        
          </div>
          <footer>
            <Footer/>
          </footer>
          </div>
        );
    }
}


 export default Msgs 
