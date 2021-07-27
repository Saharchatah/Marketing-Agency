import {Parallax} from 'react-parallax';

import styles from './header_2.module.css';

const  header_2 = ()=>{


const back= "https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1574&q=80" ;
    
document.body.style.textAlign="center";

    return(
                   
            
   <Parallax bgImage={back}  strength={250}>
   <div className={styles.bg_container} >
        <h1   className={styles.DA_H1_H}>Market Hub</h1>
        <p className={styles.bg_p}> "A hand you can  trust" </p>          
   </div>
  
   </Parallax>
    
    )

}


export default  header_2;
