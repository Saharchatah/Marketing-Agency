import { Components } from 'react';
import './our_services.css';
import img1 from'./marketing strategies.png'
import img2 from'./photo-camera.png'
import img3 from'./analytics.png'
import img4 from'./content_marketing.png'
import img5 from'./SMM.png'
import img6 from'./APP DEVELOPMENT.png'
import img7 from'./digital-marketing.png'
import img8 from'./GRAPHIC DESIGN.png'
import img9 from'./WEBSITES.png'




const our_services = ()=>{
    return(
         <div id="DA_all_S">
              <body className="DA_body_S" >
                  <div className="DA_ourservices">
                  <h2 className="DA_h2_11">_______________</h2>
                  <h1 className="DA_h1_1">OUR INTEGRATED SERVICES</h1>
                  <h2 className="DA_h2_22">______________________________</h2>
                  </div>
                 
                  <div className="DA_T_S">
                  <div className="DA_col_S1">
                  <div class='DA_anim1_se part1'>
                       <img className="DA_icon_S" src={img1}/> 
                       <h4 className="DA_h4">MARKETING STRATEGIES</h4>
                       <p className="DA_p_S">Online Marketing , Offline Marketing</p>
                  </div>
                  <div class='DA_anim1_se part2'>
                       <img className="DA_icon_S" src={img2}/> 
                       <h4 className="DA_h4">PHOTOGRAPHY/VIDEOGRAPHY</h4>
                       <p className="DA_p_S">Social Media posts, Online Ads, Magasine Ads, Events</p>
                  </div>
                  <div class='DA_anim1_se part3'>
                       <img className="DA_icon_S" src={img3}/> 
                       <h4 className="DA_h4">ANALYTICS</h4>
                       <p className="DA_p_S">Google Analytics</p>
                  </div>
                  </div>
                  <div className="DA_col_S1  center">
                  <div class='DA_anim2_se part4'>
                       <img className="DA_icon_S"src={img4}/> 
                       <h4 className="DA_h4">CONTENT MARKETING</h4>
                       <p className="DA_p_S">Content creation for all channels</p>
                  </div>
                  <div class='DA_anim2_se part5'>
                       <img className="DA_icon_S" src={img5}/> 
                       <h4 className="DA_h4">SMM</h4>
                       <p className="DA_p_S">Full management of all Social Media Channels</p>
                  </div>
                  <div class='DA_anim2_se part6'>
                       <img className="DA_icon_S" src={img6}/> 
                       <h4 className="DA_h4">APP DEVELOPMENT</h4>
                       <p className="DA_p_S">UX/UI</p>
                  </div>
                  </div>
                  <div className="DA_col_S1   DA_third_items">
                  <div class='DA_anim3_se part7'>
                       <img className="DA_icon_S" src={img7}/> 
                       <h4 className="DA_h4">DIGITAL MARKETING</h4>
                       <p className="DA_p_S">Google Ads</p>
                  </div>
                  <div class='DA_anim3_se part8   DA_scnd_third_items'>
                       <img className="DA_icon_S" src={img8}/> 
                       <h4 className="DA_h4">GRAPHIC DESIGN</h4>
                       <p className="DA_p_S">Logos, Packaging, Branding, Business Cards, Flyers, Invitation Cards</p>
                  </div>
                  <div class='DA_anim3_se part9   DA_last_third_items '>
                  
                       <img className="DA_icon_S"src={img9}/> 
                       <h4 className="DA_h4">WEBSITES DESIGN & DEVELOPMENT</h4>
                       <p className="DA_p_S">Homepages, E-Commerce, Blogs, Interactive websites, Hosting</p>
                  </div>
                  </div>
                  </div>
          
              </body>
         </div>

       
    )
}
export default our_services;