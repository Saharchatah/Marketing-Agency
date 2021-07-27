
// import {useWindowScroll} from 'react-use';

import './our_story.css';

const our_story=()=>{


    document.body.style.textAlign="center";

    // const{y:pageYoffset}=useWindowScroll();


    return(

<div className="BA_stroyCont">

<div>

<hr className="BA_hr_str_1"/>   

<h1 className="BA_h1_str">Our Story</h1>

<hr className="BA_hr_str_2"/>

</div>

<div className="BA_storyParag">
    <div>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        
         </p>
    
    </div>
  <div> 
<p> when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
 </div>
 
 <div>
 <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
 </div>
 
 </div>

</div>
    
    );



}

export default our_story;