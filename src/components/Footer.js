import React from 'react';
import pay from "../images/sslcom.png"
import { Form, Button, Container, Row, Col, FormGroup, Input } from 'reactstrap';
import ssl from "../images/Pay logo/1 (1).png"
import bkash from "../images/Pay logo/1.png";
import pathao from "../images/Pay logo/2 (1).png";
import mCash from "../images/Pay logo/2.png";
import myCash from "../images/Pay logo/3.png";
import upay from "../images/Pay logo/4.png";
import rocket from "../images/Pay logo/5.png";
import qcash from "../images/Pay logo/6.png";
import nexusPay from "../images/Pay logo/7.png";
import unionPay from "../images/Pay logo/8.png";
import amex from "../images/Pay logo/9.png";
import visa from "../images/Pay logo/10.png";
import nagad from "../images/Pay logo/11.png";
import mastercard from "../images/Pay logo/12.png";
import islamiWallet from "../images/Pay logo/13.png";
import iPay from "../images/Pay logo/14.png";
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const paymentIcons = [
  bkash,
  mCash,
  myCash,
  upay,
  rocket,
  qcash,
  nexusPay,
  unionPay,
  amex,
  visa,
  nagad,
  mastercard,
  islamiWallet,
  iPay
];

function Footer() {
  return (
    <>
    <div
      style={{
        /* borderTop: "2px solid rgba(199, 198, 197, 0.13)", */
        background: "rgba(163, 163, 163, 0.41)",
        padding: "5% 0",
      }}
    >
      <Container className='pt-4' style={{ maxWidth: "91%" }}>
        <Row className='d-felx justify-content-center'>
          <Col md={2}>
            <h3 className='text-center mt-4'>Legal</h3>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home/privacy">
              <div className='text-center mt-3' style={{textDecoration: "none", color: "black", cursor: "pointer"}}>Privacy Policy</div>
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home/payment">
              <div className='text-center mt-2' style={{textDecoration: "none", color: "black", cursor: "pointer"}}>Payment Policy</div>
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home/shipping">
              <div className='text-center mt-2' style={{textDecoration: "none", color: "black", cursor: "pointer"}}>Shipping Policy</div>
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home/terms">
              <div className='text-center mt-2' style={{textDecoration: "none", color: "black", cursor: "pointer"}}>Terms & Conditions</div>
            </Link>
          </Col>
          <Col md={2}>
            <h3 className='text-center mt-4'>Information</h3>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home/refund">
              <div className='text-center mt-3' style={{textDecoration: "none", color: "black", cursor: "pointer"}}>Return & Refund Policy</div>
            </Link>
          </Col>
          <Col md={2}>
            <h3 className='text-center mt-4'>Company</h3>
            <Link style={{ textDecoration: "none", color: "black" }} to="/home/aboutus">
              <div className='text-center mt-3' style={{textDecoration: "none", color: "black", cursor: "pointer"}}>About us</div>
            </Link>
          </Col>
          <Col md={2}>
            <h3 className='text-center mt-4'>Socials</h3>
            <div className='d-flex justify-content-center mt-3 mb-4'>
              <a href="https://www.facebook.com/velourabd" target="_blank" rel="noopener noreferrer" className="mr-2">
                <FaFacebook color='black' size={25} />
              </a>
              <a href="https://www.instagram.com/velourabd" target="_blank" rel="noopener noreferrer" className="mr-2">
                <FaInstagram color='black' size={25} />
              </a>
            </div>

            <div className='text-center mb-2'>
              <a href="tel:01629743377" className="text-dark">01629743377</a>
            </div>

            <div className='text-center mt-3'>Email Us...</div>
            <div className='text-center mb-4'>
              <a href="mailto:velourabd.online@gmail.com" className="text-dark">velourabd.online@gmail.com</a>
            </div>

            <div className='text-center mt-3'>Warehouse Location</div>
            <div className='text-center mb-4'>
              <a
                href="https://maps.app.goo.gl/sDs3fmfQAaif4wDU6?g_st=com.google.maps.preview.copy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark"
              >
                View on Google Maps
              </a>
            </div>
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
          <Col md={6}>
            <Row className="g-0 d-flex justify-content-center pr-3 pl-3">
              {paymentIcons.map((icon, idx) => (
                <Col
                  md={1}
                  sm={1}
                  xs={2}
                  key={idx}
                  className="text-center border-start border-end px-1 mb-2"
                >
                  <img
                    className="text-dark p-2 rounded"
                    style={{width: "100%", border: "1px solid black", boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"}}
                    src={icon}
                  />
                </Col>
              ))}
            </Row>
          </Col>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
              <div>
                <div className='text-center mb-1 mt-3'>Verified by</div>
                  <img style={{width: "125px"}} src={ssl}/>
              </div>
            </div>
            <div className='text-center mt-3'>Demo text for trade license number</div>
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
