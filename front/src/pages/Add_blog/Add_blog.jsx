import React, { Component } from 'react';
import Header from '../../components/Home_Page/header/header';
import Footer from '../../components/Home_Page/footer/footer';

import './Add_blog.css'

import style from '../../components/Getin_touch/Getin3/getin3.module.css';
class Edit_blog extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            desc: '',
            img: '',
            blogs:[] ,
            imgG:''       

        }
        this.handdleChange = this.handdleChange.bind(this);
        this.createBlog = this.createBlog.bind(this);
        this.handleChangefile = this.handleChangefile.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);


        




    }

    async createBlog(params = {}) {
        let { title, desc, img } = this.state;
        let url = `//localhost:8000/blog/create/img?blogName=${title}&blogtext=${desc}`
        let body = null;
        if (img) {
            body = new FormData();
            body.append(`img`, img);
        }
        const response = await fetch(url, { method: 'POST', body });
        console.log(response)
    }

    getblog = async ()=>{
        const response = await fetch('http://localhost:8000/blogs');
        const result = await response.json() ;
  
       
        const blogs = result.result;
     let a=blogs.length-1;
      this.setState({blogs,imgG:blogs[a].blogPics})
   

      
      }

    handdleChange(e) {

        let { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state);

    }
 
   async handlesubmit(ev) {
        ev.preventDefault();
        let { title, desc, img } = this.state
       await this.createBlog({ title, desc, img });
        await this.getblog();
        this.props.history.push('/blogs');


    }

    handleChangefile(e) {
        console.log(e.target.files)
        let { name, files } = e.target
        this.setState({
            [name]: files[0]
        })
    }

    render() {
        let { title, desc,imgG } = this.state;
       console.log(imgG);
       
        return (
            <div>
                               <Header/>
            <div className={style.FAform} >
 
                <form  onSubmit={this.handlesubmit}>
                    <table>
                        <tr>
                  
                    <label className={style.label1} >
                        <p >title</p>
                        <input className={style.inp1} onChange={this.handdleChange} type='text' name='title' value={title}></input>

                    </label>
                    </tr>
                    <tr>
                    <label className={style.label1}>
                        <p>decription</p>
                        <textarea className={style.inp1}  onChange={this.handdleChange} name='desc' value={desc}></textarea>
                    </label >
                    </tr>
                    <tr>
                    <label className={style.label1}>
                        <p>imge</p>
                        <input name='img' type="file" onChange={this.handleChangefile} />
                    </label >
                    </tr>
                    <tr>
                    <input  className={style.sub}  value='upload' type='submit' />
                   
               
                </tr>
                </table>
                </form>
                </div>
                <div className='FixFooter' >
                <Footer />
                </div>
           
            </div>
        );
    }
}

export default Edit_blog;
// `http://localhost:8000/images/${blogs}`