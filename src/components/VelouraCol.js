import React, { useEffect, useState } from 'react';
import { CardImg, Col, Container, Row } from 'reactstrap';
import about from "../images/about.jpg"
import { motion } from 'framer-motion';

const VelouraCol = () => {

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${about})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "50px 0",
        marginTop: "70px",
        backgroundAttachment: "fixed",
        height: "70vh",
      }}
    >
      <Container id="aboutus" style={{ minWidth: "90%", height: "100%" }}>
        <Row style={{ height: "100%", justifyContent: "center" }}>
          <Col
            md={6}
            className="mb-4 d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <motion.div 
              style={{ textAlign: "center", color: "white", fontSize: "clamp(20px, 2.5vw, 28px)" }}
              initial={{ opacity: 0, y: 500 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{delay: 2, duration: 1, type: "tween", ease: "easeIn",}}>
                <h1 className='p-2'>Veloura Collection</h1>
                <p>
                Elevate Your Everyday Look
                Discover the perfect blend of style and functionality with our Veloura Collection. From timeless classics to bold modern frames, each piece is designed to fit comfortably and express your unique personality.
                Wear your story with confidence.
                </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VelouraCol;