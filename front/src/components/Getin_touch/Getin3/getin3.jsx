// import React from 'react';
// import { setCookie, removeCookie, getCookie } from '../../../cookie';

// import style from './getin3.module.css';
// class Getin3 extends React.Component {

//   render() {
//     let id=getCookie('id')
//     return (
//       <div>
//         <form className={style.FAform}>
//           <table>
//             <tr>
//               <label className={style.label1}>
//                 <p className={style.name1}>Name<span>*</span></p>
//                 <div className={style.div1}>
//                   <section>
//                     <input placeholder='firstName' className={style.inp1} type="text" required />
//                     {/* <p className={style.firstname}>FirstName</p> */}
//                   </section>
//                   <section className={style.input1} required>
//                     <input placeholder='lastName' className={style.fainput}  type="text" />
//                     {/* <p className={style.firstname}>LastName</p> */}
//                   </section>
//                 </div>
//               </label>
//             </tr>
//             <tr>
//               <label className={style.email9}>
//                 <p className={style.name1}>Email<span className='FASPANGET'>*</span></p>
//                 <input type="email" class={style.email2} id="" required />
//                 <p className={style.firstname}>Please enter your email, so we can follow up with you.</p>
//               </label>
//             </tr>
//             <tr>
//               <h3 className={style.which1}><b>Which department do you wish to hear back from? <span className='FASPANGET'>*</span></b></h3>
//               <div className={style.faradio}>
//                 <label>
//                   <input required type="radio" name="a" id="" />Marketing Consultancy
// </label>
//                 <label>
//                   <input type="radio" name="a" id="" />Digital Marketing & Advertising
// </label>
//                 <label>
//                   <input type="radio" name="a" id="" />Branding & Design
// </label>
//                 <label>
//                   <input type="radio" name="a" id="" />Web & App Development
// </label>
//                 <label>
//                   <input type="radio" name="a" id="" />Photography
// </label>
//               </div>
//               <p className={style.which}>Which department do you wish to hear back from?<span className='FASPANGET'>*</span></p>
//             </tr>
//             <tr>
//               <select className={style.faselect}>

//                 <option defaultChecked>Word of mouth/ Recommendation</option>
//                 <option>Google search</option>

//                 <option>Social Media (Facebook/Instagram)</option>
//                 <option>Other</option>


//               </select>
//             </tr>
//             <tr>
//               <label className={style.email}>
//                 <p className={style.name1}>Subject<span className='FASPANGET'>*</span></p>
//                 <input type="text" className={style.email2} id="" required />
//               </label>
//             </tr>
//             <tr>
//               <label className={style.name1}>
//                 <p>message<span className='FASPANGET'>*</span></p>
//                 <textarea className={style.fatstarea} required id="w3review" name="w3review" rows="4" cols="50" />
//               </label>
//               </tr>
//               <tr>
//               {id ? (
//                <input type="submit" name="" className={style.sub} />
//                 ) : (
//                 <h3>you must be register on legged in to send a message</h3>
//                 )}
              
//             </tr>
//           </table>
//         </form>
//       </div>
//     );
//   }
// }

// export default Getin3;









import React from 'react';

import style from './getin3.module.css';
import { setCookie, removeCookie, getCookie } from '../../../cookie';


class Getin3 extends React.Component {
  
  constructor(){

    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCheck  = this.handleCheck.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);

    this.state = {username:"",lastname:"",email:"",depatment_hearing:"",department:"",subject:"",messages:"" };
    
    // this.state1={selectValue:""}
    
}



// fetch=async()=>{
//   let url = `http://localhost:8000/meage/inesrt/?UserId=235&name=rwe&email=eywgtt&messageContent=er&mesgTitle=akfcnaaj&hearing=apfojalksn&department=afoilajke`;
  
//   const response=await fetch(url);
// }

  InsertMessages = async () => {
    let { username,lastname,email,depatment_hearing,department,subject,messages} = this.state;
    let name= username+" "+lastname;
    let id=getCookie('id')
    console.log({id,name,email,depatment_hearing,department,subject,messages})
 
    let url = `http://localhost:8000/meage/inesrt/?UserId=${id}&name=${name}&email=${email}&messageContent=${messages}&mesgTitle=${subject}&hearing=${depatment_hearing}&department=${depatment_hearing} `;
   //  let url = `http://localhost:8000/meage/inesrt/?UserId=efew&name=fwe&email=ef&messageContent=ajnjks&mesgTitle=akfcnaaj&hearing=apfojalksn&department=afoilajke`;
    // let url = `//localhost:8000/message/insert/?uerid=774&name=awake&email=alllmnqammaal&messageContent=aalkjka&mesgTitle=sksam&hearing=osaadsj&department=asoaks`
    const response = await fetch(url);
    let paramsErr = "you need to enter all message informations  to Insert a message";
    if (!name || !email || !depatment_hearing||!department||!subject||!messages) throw new Error(paramsErr);

    // try {

      
    //     const result = await response.json();

    //  //   if (result.success) {
    //         let IsertOperation = result.result;
    
    //         this.setState({username:"",lastname:"",email:"",depatment_hearing: "",department:"",messages:"",subject:"" });
    //     //}
    // }
    // catch (e) {
    //     throw new Error(e);
    // }
}

async handlesubmit(ev) {

  ev.preventDefault();
  await this.InsertMessages();
  // this.props.InsertMessages({username,lastname,email,depatment_hearing,department,subject,messages});


  }


 
handleChange(e) {

  let { name, value } = e.target;
  this.setState({ [name]: value});
  

}

handleSelect(e){
  this.setState({department:e.target.value});
  // console.log(this.state.department);
}


handleCheck(e){
this.setState({depatment_hearing:e.target.value});
// console.log(this.state.depatment_hearing);
}

  render() {
    let id=getCookie('id')
    let{username,lastname,email,subject,messages}=this.state;

    return (
      <div>

        <form className={style.FAform}  onSubmit={this.handlesubmit} >
          <table>
            <tr>
              <label className={style.label1}>
                <p className={style.name1}>Name<span>*</span></p>
                <div className={style.div1}>
                  <section>
                    <input placeholder='firstName' className={style.inp1} type="text" name="username" value={username}  onChange={this.handleChange} required />
                    {/* <p className={style.firstname}>FirstName</p> */}
                  </section>
                  <section className={style.input1} required>
                    <input placeholder='lastName' className={style.fainput}  type="text" name="lastname" value={lastname} onChange={this.handleChange} />
                    {/* <p className={style.firstname}>LastName</p> */}
                  </section>
                </div>
              </label>
            </tr>
            <tr>
              <label className={style.email9}>
                <p className={style.name1}>Email<span>*</span></p>
                <input type="email" class={style.email2} id="" name="email" value={email} onChange={this.handleChange} required />
                <p className={style.firstname}>Please enter your email, so we can follow up with you.</p>
              </label>
            </tr>
            <tr>
              <h3 className={style.which1}><b>Which department do you wish to hear back from? <span>*</span></b></h3>
              <div className={style.faradio} >
                <label>
                  <input  type="radio" name="depatment_hearing" id="" value="Marketing Consultancy" onChange={this.handleCheck} required />Marketing Consultancy
                </label>
                
                <label>
                  <input type="radio" name="depatment_hearing" id="" value="Digital Marketing & Advertising" onChange={this.handleCheck}/>Digital Marketing & Advertising
                </label>
               
                <label>
                  <input type="radio" name="depatment_hearing" id="" value="Branding & Design"  onChange={this.handleCheck}/>Branding & Design
                </label>

                <label>
                  <input type="radio" name="depatment_hearing" id="" value="Web & App Development" onChange={this.handleCheck} />Web & App Development
</label>
                <label>
                  <input type="radio" name="depatment_hearing" id="" value="Photography" onChange={this.handleCheck} />Photography
</label>
              </div>
              <p className={style.which}>Which department do you wish to hear back from?<span>*</span></p>
            </tr>
            <tr>
            {/* defaultValue={"Social Media (Facebook/Instagram)"} */}
              <select className={style.faselect} id="BA_LIST" name="department"   onChange={this.handleSelect}  required >

                <option value=""></option> 
                <option  value="Word of mouth/ Recommendation">Word of mouth/ Recommendation</option>
                <option value="Google search">Google search</option>

                <option value="Social Media (Facebook/Instagram)">Social Media (Facebook/Instagram)</option>
                <option value="Other">Other</option>

              </select>

            </tr>
            <tr>
              <label className={style.email}>
                <p className={style.name1}>Subject<span>*</span></p>
                <input type="text" className={style.email2} id=""  onChange={this.handleChange} name="subject" value={subject} required />
              </label>
            </tr>
            <tr>
              <label className={style.name1}>
                <p>message<span>*</span></p>
                <textarea className={style.fatstarea}  onChange={this.handleChange}  required id="w3review" name="messages" value={messages} rows="4" cols="50" />
              </label>
              </tr>
              <tr>
              {id ? (
               <input type="submit" name="" className={style.sub} />
                ) : (
                <h3>you must be legged in to send a message</h3>
                )}
            </tr>
          </table>
        </form>
      </div>
    );
  }
}

export default Getin3;