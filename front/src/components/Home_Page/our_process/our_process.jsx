import { Components } from 'react';
import './our_process.css';
import img1 from'./meeting.png'
import img2 from'./planning.png'
import img3 from'./creation.png'
import img4 from'./Approval.png'
import img5 from'./delivery.png'



const our_process = ()=>{
    return(
        
        <div id="DA_all">
          <body className="DA_body" >
          
          <div className="DA_ourprocess">
          <h2 className="DA_h2_1">_____________</h2>
          <h1 className="DA_h1">OUR PROCESS</h1>
          <h2 className="DA_h2_2">___________________________</h2>
          </div>
         
          <p className="DA_p">This is how we work</p>
          <div class='DA_anim_pr part1'>
              <img className="DA_icon" src={img1}/> 
              <h2 className="DA_h2_3">Meeting</h2>
          </div>
          <div class='DA_anim1_pr part2'>
              <img className="DA_icon" src={img2}/> 
              <h2 className="DA_h2_3">Planning</h2>
          </div>
          <div class='DA_anim_pr part3'>
              <img className="DA_icon" src={img3}/> 
              <h2 className="DA_h2_3">Creation</h2>
          </div>
          <div class='DA_anim1_pr part4'>
              <img className="DA_icon"src={img4}/> 
              <h2 className="DA_h2_3">Approval</h2>
          </div>
           <div class='DA_anim_pr part5'>
             <img className="DA_icon" src={img5}/> 
             <h2 className="DA_h2_3">Delivery</h2>
          </div>

          
          </body> 
        </div>
        
          
    )

 }
 export default our_process;
