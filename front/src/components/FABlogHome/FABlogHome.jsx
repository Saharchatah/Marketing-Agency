import React, { Component } from 'react';
import './testMAP.css';
import { Link } from 'react-router-dom'
import {Parallax} from 'react-parallax';




class Edit_blog1 extends Component {

    constructor() {

        super();

        this.state = {

            blogs: []


        }


        this.handleClick = this.handleClick.bind(this);



    }
    // async componentDidUpdate() {
    //     await this.getblog();
    // }

    async componentDidMount() {

        await this.getblog();

    }

    getblog = async () => {

        
        const response = await fetch('http://localhost:8000/blogs');
        
        const result = await response.json();
        
        const blogs = result.result;

        this.setState({ blogs })
        
        // console.log(blogs);


    }

    handleClick() {
        console.log(this.props.history.push('/add'));
    }



    render() {
        let { blogs } = this.state;
const blog1=blogs.slice(blogs.length-6,blogs.length);
        const listItems = blog1.reverse().map((blog) => 



<div class="flip-card">

  <div class="flip-card-inner">
    
    <div class="flip-card-front"  >
    
      <img 
      
      src={`http://localhost:8000/images/${blog.blogPics}`}  
      
      alt="Avatar" className='FAimg' />
    
    </div>
    
    <div class="flip-card-back">


       <div className="fa_blogHome_title">
    
       <h1 className='FAh1'>{blog.blogName} </h1> 
    
       </div>
    
    
    </div>
  
  </div>

</div>

        );
        return (

            <div className="FA_blog_homepage">
            {listItems}
            </div>

        );
    }
}


export default Edit_blog1;