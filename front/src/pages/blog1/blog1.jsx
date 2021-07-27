import React, { Component } from 'react';
import { setCookie, removeCookie, getCookie } from '../../cookie';
import Header from '../../components/Home_Page/header/header';
import Footer from '../../components/Home_Page/footer/footer';
import Pdf from "react-to-pdf";








import './blog1.css';


class blog1 extends Component {
    constructor(props) {
        super();
        this.state = {
            img: '',
            title: '',
            desc: '',
            cmnt: '',
            cmts: [],
            admin: false,
            cmnt1: ''
        }

    }

    componentDidMount = () => {
        this.idd()
        this.getcmnt()
        this.isAdmin()
       
    }

    deletecom = async (nameo) => {
        try {
    //this line delete the contact from the sever
          const response = await fetch(`http://localhost:8000/commtt/delete/${nameo}`);
          const result = await response.json();

          if (result) {
              this.componentDidMount()
    //this line delete the contact from the client side l browser
            let stateuser = [...this.state.cmts].filter(uss => uss.name!=nameo);
    
          
            this.setState({ cmts: stateuser });
    
          } else this.setState({ error: result.message });
    
        } catch (err) {
          this.setState({ error_message: err })
        }
      }
        

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state);

    }

    getcmnt = async () => {
        let idblog = this.props.match.params.id
        const url = `http://localhost:8000/comname/${idblog}`;
        const response = await fetch(url);
        const answer = await response.json();

        console.log(answer);
        if (answer) {
            this.setState({ cmts: answer })
            console.log(this.state.cmts);
        }

    }

    comment = async () => {

        let userId = getCookie('id');
        let idblog = this.props.match.params.id
        let { cmnt, cmts } = this.state;
        let d = new Date();
 
       
        if (cmnt) {

            try {
                const url = `http://localhost:8000/comt/create/?userId=${userId}&blogId=${idblog}&comment=${cmnt}&dateCom=${d}`;

                const response = await fetch(url);
                const answer = await response.json();
                if (answer.success) {
                    this.getcmnt();
                } else {
                    this.setState({ error_message: answer.message });

                }
            } catch (err) {
                this.setState({ error_message: err.message });

            }
        } else { }

    };

    idd = async () => {
        let id = this.props.match.params.id
        console.log(id);
        let url = `http://localhost:8000/blogs/${id}`
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)
        console.log(result.result)
        const img = result.result.blogPics;
        const title = result.result.blogName;
        const desc = result.result.blogtext;
        this.setState({ img, title, desc })
    }


    handleDelete = async () => {

        let id = this.props.match.params.id
        let answer = await fetch(`http://localhost:8000/blogs/delete/${id}`);
        let result = await answer.json();
        console.log(result)
        if (result) {

            this.props.history.push('/blogs');
        }
    }


    isAdmin = async (ev) => {
        let id = getCookie('id');


        if (!id) return;
        let url = `http://localhost:8000/user/isAdmin/${id}`;
        try {

            const response = await fetch(url);
            const result = await response.json();
            if (result.result) {
                this.setState({ admin: true })
            }


        } catch (e) {

        }
    }



    render() {
        let idc = getCookie('id');
        let { img, title, desc, cmnt, cmts, admin, cmnt1 } = this.state;
        console.log(cmts)
        const cmtss = cmts.reverse().map((cmt) => <div className='DA_com_B' style={{

            border: ' 1px',
      
            borderRadius: '10px',

            width: '40%',
            color:'white',

            margin: '0.5%',

            marginLeft: '5rem',

            backgroundColor: ' #20616b'

        }}

        >

            <p style={{

                marginLeft: '3%',
                wordWrap: 'break-word'


            }}><span className='spanCom'>{cmt.name} :</span><span className='spanCome'>{cmt.comment}</span></p>
<p className='flexFA'>
           
            {(idc == cmt.userId || admin) ? (
                <input className='DA_XX_B' type='button' onClick={() => this.deletecom(cmt.comId)} value='X' />
            ) : (
                <p></p>
            )}
             <p className='spanComD' style={{
             textAlign:'right',
           


            }}>
                <span className='spanCom'>At: </span > {cmt.dateCom.slice(0,25)}</p>
</p>
        </div>
        );
        const ref = React.createRef();
        const options = {
            orientation: 'landscape',
            unit: 'in',
            format: [4, 2]
        };
        return (

            <div className="DA_all_B">

                <Header />

          
                <body className="DA_body_B" ref={ref}>

                    <div className="DA_G_B>">

                        <div className="DA_div1_B">


                            <img className="DA_img_B" src={`http://localhost:8000/images/${img}`} />

                            <div className="DA_div7_B">

                                <h2 className="DA_h2_B"> {title}</h2>

                            </div>

                        </div>


                        <div>

                            <p className="DA_p_B" maxlengt="2rem">

                                {desc}

                            </p>


                        </div>

                        <div className="BA_Wrapper_comment_button" >

                            <div className="DA_div2_B">



                                <div className="DA_button_B">
                                <Pdf targetRef={ref} filename="blog.pdf" x={4} y={1} scale={0.8}>
                    {({ toPdf }) =>  <button onClick={toPdf} className="DA_button_D" >Download</button>}
                </Pdf>

                                   

                                    {idc ? (
                                        <button onClick={this.comment} className="DA_button_D">comment</button>
                                    ) : (
                                        <p></p>
                                    )}


                                    {admin ? (
                                        <button onClick={this.handleDelete} className="DA_button_D">del</button>
                                    ) : (
                                        <p></p>
                                    )}



                                </div>

                            </div>


                            <div className="DA_commentBody">

                                {idc ? (
                                    <textarea value={cmnt} onChange={this.handleChange} className=" DA_commenttextarea" name="cmnt" rows="7" placeholder='comment here....' form='userform' placeholder="Enter comment here...."></textarea>

                                ) : (
                                    <p>
                                        <textarea value={cmnt1} className=" DA_commenttextarea" name="cmnt" rows="7" form='userform' placeholder="cant comment befoore register or logged in"></textarea>

                                    </p>
                                )}

                            </div>



                            <div className="BA_comment_dsiplay">
                               <div>
                               {cmtss}
                               </div>
                            </div>

                        </div>
                    </div>
                </body>

                <Footer />

            </div>






            // <div className="DA_all_B">


            //     <h1>{title}</h1>

            //     <img src={`http://localhost:8000/images/${img}`} />
            //     <p>{desc}</p>

            // </div>

        )

    }
}
export default blog1;


