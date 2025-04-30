import React from 'react';
import pay from "../images/sslcom.png"
import { Form, Button, Container, Row, Col, FormGroup, Input } from 'reactstrap';
import bk from "../images/Pay logo/25.jpg"
import ng from "../images/Pay logo/images.png"
import visa from "../images/Pay logo/visa-logo-300x300.png"
import master from "../images/Pay logo/unnamed.jpg"
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const paymentIcons = [  
  visa, visa, visa, visa, visa, visa
  ];

function Footer() {
  return (
    <>
    <div
      style={{
        /* borderTop: "2px solid rgba(199, 198, 197, 0.13)", */
        background: "linear-gradient(to top, #b6b4ae, white)",
        padding: "5% 0",
      }}
    >
      <Container className='pt-4' style={{ maxWidth: "91%" }}>
        <Row className='d-felx justify-content-center'>
          <Col md={2}>
            <h3 className='text-center'>Legal</h3>
            <div className='text-center mt-3'>Privacy Policy</div>
            <div className='text-center mt-2'>Payment Policy</div>
            <div className='text-center mt-2'>Shipping Policy</div>
            <div className='text-center mt-2 mb-4'>Terms & Conditions</div>
          </Col>
          <Col md={2}>
            <h3 className='text-center'>Information</h3>
            <p className='text-center mt-3 mb-4'>Exchange & Refund</p>
          </Col>
          <Col md={2}>
            <h3 className='text-center'>Company</h3>
            <div className='text-center mt-3'>About Us</div>
            <div className='text-center mt-2 mb-4'>Contact Us</div>
          </Col>
          <Col md={2}>
            <h3 className='text-center'>Socials</h3>
            <div className='d-flex justify-content-center mt-3 mb-4'>
              <FaFacebook className='mr-2' size={25}/>
              <FaInstagram className='mr-2' size={25}/>
              <FaTiktok className='mr-2' size={25}/>
            </div>
            <div className='text-center mt-3'>Email Us...</div>
            <div className='text-center mb-4'>Example@gmail.com</div>
          </Col>
        </Row>
        <Row className='d-felx justify-content-center'>
          <Col md={8} className='d-flex justify-content-center'>
            <div className='mt-4'>
              <h3 className='text-center'>Payment Partners</h3>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col md={4} style={{borderRight: "1px solid black", borderLeft: "1px solid black"}}>
            <Row className="g-0">
              {paymentIcons.map((icon, idx) => (
                <Col
                  md={2}
                  sm={2}
                  xs={3}
                  key={idx}
                  className="text-center border-start border-end"
                >
                  <img
                    className="text-dark p-2 rounded"
                    style={{width: "100%"}}
                    src={icon}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
              <div>
                <div className='text-center mb-1 mt-3'>Verified by</div>
                <img style={{width: "125px"}} src={pay}/>
              </div>
            </div>
        </Row>
      </Container>
    </div>
    <div className='w-100 text-white text-center py-3' style={{backgroundColor: "black"}}>
      All rights Reserved Veloura
    </div>
    </>
  );
}

export default Footer;
