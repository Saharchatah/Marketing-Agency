import React from 'react'
import "./EditUsers.css"
import deleteImg from './delete.png'
import Header from '../../components/Home_Page/header/header'
import Footer from '../../components/Home_Page/footer/footer'

import usericon from './user.png'
class EditUsers extends React.Component{

    
state={
    sisa:[]
   
}

    async componentDidMount() {
          await this.getusers(); 
        // await this.deleteuser();
       
      
   
            }

getusers = async () => {
    try {
        const response = await fetch('http://localhost:8000/users');
      const result = await response.json();
      console.log(result)
    
      if (result) 
      this.setState({ sisa: result })
      
      else 
      this.setState({ error: result.message });

    } catch (error) {
      this.setState({ error })
    }
    
  }


  
  deleteuser = async (nameo) => {
    try {
//this line delete the contact from the sever
      const response = await fetch(`//localhost:8000/users/delete/${nameo}`);
      const result = await response.json();

      if (result.success) {
//this line delete the contact from the client side l browser
        let stateuser = [...this.state.sisa].filter(uss => uss.name!=nameo);

      
        this.setState({ sisa: stateuser });

      } else this.setState({ error: result.message });

    } catch (err) {
      this.setState({ error_message: err })
    }
  }
    



  mkadmin = async (nameo) =>{
    
  try{
    const response = await fetch(`//localhost:8000/users/makeAdmin/${nameo}`);
    const result = await response.json();
    console.log(result)


    
      }catch(err){
    this.setState({ error_message: err })
  }}

  

    unmakeAdmin = async (nameo) =>{
      try{
        const response = await fetch(`//localhost:8000/users/unmakeAdmin/${nameo}`);
        const result = await response.json();
       
        console.log(result)
        this.componentDidMount();
    
        
          }catch(err){
        this.setState({ error_message: err })
      }
   
    }






  

    render(){
        
       let{sisa, deleteuser, unmakeAdmin ,mkadmin}=this.state;
      
        return(
        

//   <div >
              
              
//   <div class="llll container col-s-12 col-md-12" >
 
//      {sisa.map(us => (

// <div class="usersdesign " key={us.id}>

// <img class="boo" src={usericon} alt="no picture"/>



//  <p ><div class="myinfoss"><b>Name: </b>{us.name}<br/> <b>Email: </b>{us.email}</div> <br/><button class="mybuttona" onClick={() => this.deleteuser(us.name)}>delete x</button>

// <div class="boxcheck">
// <p class="mylabel"><b>Admin:</b></p>
// { us.admin ? (
//  <input class="chekk" type="checkbox"  onClick={()=>this.unmakeAdmin(us.name)}  checked /> 
// ):( <input class="chekk" type="checkbox"  onClick={()=>this.mkadmin(us.name)}  /> 
// )}
// </div>
 

// </p> 


// </div> ))} 

//   </div> </div>
// );
// }
// }
// export default EditUsers




              
             <div>
               <header>
                 <Header/>
               </header>
<table id="customers">
<tr>
    <th>name</th>
    <th>email</th>
     <th>admin</th>
     <th>Delete User</th>
  </tr>

   {sisa.map(us => (

<tr key={us.id}>

<td>{us.name}</td>
<td>{us.email}</td>



<td >{ us.admin ? (
<input class="chekk" type="checkbox" onChange={()=>this.unmakeAdmin(us.name)}  checked /> 
):( <input class="chekk" type="checkbox"  onChange={()=>this.mkadmin(us.name)}  /> 
)}</td>

<td class="tz8ir"><img class="mybuttona" src={deleteImg} onClick={() => this.deleteuser(us.name)}/></td>





</tr> ))} 



</table> 
<footer>
  <Footer/>
</footer>
</div> 

);
}
}
export default EditUsers


