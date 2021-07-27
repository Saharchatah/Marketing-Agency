import React from 'react'
import "./SeeSubs.css"
import Header from '../../components/Home_Page/header/header'
import Footer from '../../components/Home_Page/footer/footer'

class SeeSubs extends React.Component{


    state={
        subbb:[],
      
          }

          async componentDidMount() {
            await this.getsub();
           
          }


    getsub = async () => {
        try {
          const response = await fetch('//localhost:8000/subscribe');
          const result = await response.json();
          console.log(result);
      

    if (result) {
      this.setState({ subbb: result });
   
    }
         else {
          this.setState({ error: result.message });}
    
        } catch (error) {
          this.setState({ error })
        }
        
      }
    render(){
         let{subbb}=this.state;
       console.log(subbb)
       

        return(
          <div>
            <header>
              <Header/>
            </header>

          < div class="container">
          <div>
         
         
           

            <div class="yty">
             <table id="customers">
<tr>
   
    <th>emails of subscribers</th>
     
  </tr>

{subbb.map(mlk => (
         
         <tr  key={mlk.id}>
       

         <td>{mlk.email} </td></tr> 
         
              

          
          ))} 
          </table>
          </div> </div>
          
          <button class="mmyybutton">Send</button> 
          
          </div>
          <footer>
            <Footer/>
          </footer>
          </div>
        );
    }
}
 export default SeeSubs
