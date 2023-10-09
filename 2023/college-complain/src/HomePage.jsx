import React from 'react'
// import slide from './images/slide1.jpg';

import './HomePage.css';
import { Outlet, Link, useNavigate } from "react-router-dom";
function HomePage() {
  return (
    <div className='bk-image'>
      <div className="overly">

      </div>


      <section id="hero">

        <div className="container carousel-container">
          <div className="carousel-content ">
            <h2 className="">Welcome to <span>College complaint system</span></h2>
            <p className="">We are excited to introduce a new feature on our College Complaint System website that will
              enhance your experience and help us provide better support for your needs. Starting today, you will be
              prompted to select your user type when accessing the system: "Student" or "Principal." This user
              categorization will allow us to tailor our services more effectively to address your specific concerns.
            </p>

            {/* <a href="./LoginForm" className="btn-get-started"><Link to="/LoginForm">Student</Link></a> */}
            <Link to={'/LoginForm'} className="btn-get-started">Get started</Link>
            {/* <Link to={'/P_Login'} className="btn-get-started">Principal</Link> */}
            {/* <a href="#about" className="btn-get-started">Principal</a> */}
          </div>
        </div>

      </section>



    </div>
  )
}

export default HomePage