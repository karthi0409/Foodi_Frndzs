import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import CheckoutMe from "../../components/Checkout/Checkout"
const Checkout = () => {
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <>
            <Navbar />
            <CheckoutMe />
            <Footer />
        </>
    )
}

export default Checkout