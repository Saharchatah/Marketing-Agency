import React from 'react';
import Getin2 from '../../components/Getin_touch/Getin2/getin2';
import Getin3 from '../../components/Getin_touch/Getin3/getin3';
import style from './get_in_touch.module.css'
import Header from '../../components/Home_Page/header/header';
import Footer from '../../components/Home_Page/footer/footer';
import About1 from '../../components/About1/about1';

 class Getin extends React.Component {
 

    render() {
        return (
            <div class='fadivget'>
                <Header/>
            <About1/>
                <Getin2/>
                <Getin3/>
                <Footer/>
            </div>
        );
    }
}
 export default Getin;

