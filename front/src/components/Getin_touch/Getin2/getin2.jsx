import React from 'react';

import style from './getin2.module.css';
class Getin2 extends React.Component {
  render() {
    return (
      <div>
      <section className={style.section}>
        <p className={style.anim1}>__________________________</p>
        <h2 className={style.want+style.anim2}><b>WANT TO HANG OUT WITH US AND DISCUSS POTENTIAL COLLABORATIONS AND WORK?</b></h2>
        <h4 className={style.fill+style.anim2}>Fill in the form below to request a meeting and we’ll get back to you soon.</h4>
        <p className={style.anim1}>_____________________________________</p>
        
      </section>
      </div>
    );
  }
}

export default Getin2;