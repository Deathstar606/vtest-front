import React from "react";
import aboutPic from "../images/about_real.jpg"
import { motion } from "framer-motion";
import { Col, Container, Row, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

function About() {
    return (
        <motion.div
        style={{ paddingTop: "2rem" }}
        transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
        initial = {{x: 1000, opacity: 0}}
        animate= {{x: 0, opacity: 1}}
        exit= {{x: -1000, opacity: 0}}>
            <Container
                style={{ minHeight: "100vh" }}
                className="d-flex align-items-center justify-content-center"
            >
                <Row className="w-100 pb-5">
                    <Col md={6} className="d-flex justify-content-center">
                        <motion.div
                        className="mb-4"
                        style={{width: "100%"}}
                        initial = {{x: 50, opacity: 0}}
                        transition={{ duration: 1, delay: 0.75, type: "tween", ease: "easeIn" }}
                        whileInView={{x: 0, opacity: 1}}
                        viewport={{ once: true }}>
                            <CardImg
                                src={aboutPic}
                                style={{ objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }}
                            ></CardImg>
                        </motion.div>
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <div>
                            <p>
                            Veloura is more than just clothing — it’s a lifestyle. We are a fashion-forward brand born from the idea that style should be effortless, expressive, and accessible.

Our collections are designed for those who aren’t afraid to stand out. From timeless staples to bold statement pieces, every item is crafted with care, comfort, and creativity in mind.

At Veloura, we believe fashion is a form of self-expression — and we’re here to help you wear your story with confidence.
                            </p>
                            <div style={{display: "inline-block"}} className="butt">
                              Contact
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    );
}

export default About;