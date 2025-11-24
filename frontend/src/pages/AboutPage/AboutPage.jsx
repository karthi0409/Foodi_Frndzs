import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import About from "../../components/About/About"
import Footer from '../../components/Footer/Footer'
const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    return (
        <>
            <Navbar />
            <About />
            <Footer />
        </>
    )
}

export default AboutPage