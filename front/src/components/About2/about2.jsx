import React from 'react'
import './about2.css'


class about2 extends React.Component {

render(){
  return ( 
//       <div className="all">
//          <body className="sa_section1">
//              <h2 className="sa_firsth">_________</h2>
//              <h1 className="sa_ourstory">  OUR STORY</h1>
//              <h2 className="sa_secondh">________</h2>

//          </body>
         
//          <div className="sa_section2" >
            
//             <img className="sa_abim" src="images/abim.jpg" alt="no picture"/>

//             <div className="sa_section3"  >
//          <p>We are a team who's worked in the international corporate world for over a decade, 
//              and figured we preferred to spend more time 
//              with our children rather than behind a cubicle. </p>
//              <p>We've decided to bring our expertise in the marketing and digital marketing fields, to those like us, small family businesses who are trying to enter, or upgrade their presence in the digital world.

// Marketing is the art of forming public opinion. We love to make each opinion as beautiful as it can be. </p>
//              <p>We are a full-fledged Communication, Creative, and Marketing agency, with a fresh and different outlook on the world.</p>
//          </div>
//          </div>

<div className="container">
<body className="sa_section1">
    <h2 className="sa_firsth">_________</h2>
    <h1 className="sa_ourstory">  OUR STORY</h1>
    <h2 className="sa_secondh">________</h2>

</body>


    <div class="container ">
    <div class="row">  
    <div class="col-lg-6">
    <div class="sa_abim col-lg " >
   <img src="images/abim.jpg"   class="img-fluid m-auto" alt="no picture"/>
   </div>  </div>
   
   <div class="col-lg-6 ">
   <div class="sa_section3" >
<p>We are a team who's worked in the international corporate world for over a decade, 
    and figured we preferred to spend more time 
    with our children rather than behind a cubicle. </p>
    <p>We've decided to bring our expertise in the marketing and digital marketing fields, to those like us, small family businesses who are trying to enter, or upgrade their presence in the digital world.

Marketing is the art of forming public opinion. We love to make each opinion as beautiful as it can be. </p>
    <p>We are a full-fledged Communication, Creative, and Marketing agency, with a fresh and different outlook on the world.</p>
</div>
</div> 
</div></div>
         
    </div>     
   
     );
}}
 
export default about2