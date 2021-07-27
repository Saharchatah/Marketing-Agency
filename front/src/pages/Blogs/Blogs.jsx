import React, { Component } from 'react';
import './Blogs.css';

//components
import Header from '../../components/Home_Page/header/header';
import Footer from '../../components/Home_Page/footer/footer';

class Blogs extends React.Component{
    constructor() {
        super();
     
        this.state = {

            blogs: [],


        }

    }

    async componentDidMount() {

        await this.getblog();
    }

    getblog = async () => {
        const response = await fetch('http://localhost:8000/blogs');
        const result = await response.json();
        const blogs = result.result;

        this.setState({ blogs })
        console.log(blogs);


    }
   


    render(){
        
        let { blogs } = this.state;

        const listItems = blogs.reverse().map((blog) => <div onClick={() => {
   
            this.props.history.push(`/blog/${blog.id}`);

          }} class='haraki'   style={{
           
        }} >
            
          
  <img  className='BA_overlay'  

                style={{
                 
                }}

                src={`http://localhost:8000/images/${blog.blogPics}`}/>

             <div class='FATitle'>

             <div className="fa_wrapper_bloglist">

             <h3 className='FAb'>
            
                    {blog.blogName}
           
             </h3>

            </div> 

            </div>


          
        </div>);
    
    return(
        
<div >
    
<header>

<div >
<Header/>
</div>
</header>

<div  className="fa_lisblog_container "  style={{
                marginTop:"1.5rem",
                display: 'grid',
                gridTemplateColumns: '33.333% 33.333% 33.333%'

            }}>
{listItems}
</div>


<footer>
<Footer />
</footer>


</div>

);
}
}


export default Blogs;
