import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home_Page.css';

import { BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter } from "react-router-dom";


import Our_process from '../../components/Home_Page/our_process/our_process';
import Our_services from '../../components/Home_Page/our_services/our_services';
//components

import Header from '../../components/Home_Page/header/header';

import Header2 from '../../components/Home_Page/header_part2/header_2';
import Footer from '../../components/Home_Page/footer/footer';


import Our_story from '../../components/Home_Page/our_story/our_story';

import Blog_comp1 from '../../components/FABlogHome/FABlogHome';



// D:/marketing-agency/front/src/components/Home_Page/header/header.jsx
//components/Home_Page/header/header.jsx


class Home_page extends React.Component {

    render() {
        return (
            <div>
                <header>
                    <Header />
                    <Header2 />
                </header>
                <body>
                    <Our_story />
                    <Our_process />
                    <Our_services />
                    {/* <Blog_comp /> */}
                    <Blog_comp1 />
                </body>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }
}

export default Home_page;
