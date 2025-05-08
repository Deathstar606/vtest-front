import React, { useState } from "react";
import { Container, Row, Col, CardImg } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./card.css";
import shrits from "../images/category/shirt.PNG";
import polos from "../images/category/polo.JPG";
import luxury from "../images/category/luxury.JPG";
import summer from "../images/category/summer.jpg";
import demo from "../images/kyle-loftus-6TIoPIpMvLc-unsplash.jpg";

const Cats = {
  primary: {
    name: "Shirt",
    img: shrits,
    short: "Some short description for Shirt",
    cats: ["Half Sleve", "Full Sleve"],
    links: ["/home/shirt", "/home/fshirt"]
  },
  primary2: {
    name: "Polo",
    img: polos,
    short: "Some short description for Polo",
    cats: ["Polo Shirt"],
    links: ["/home/polo"]
  },
  primary3: {
    name: "Luxury",
    img: luxury,
    short: "Some short description for Luxury Wear",
    cats: ["Luxury Wear"],
    links: ["/"]
  },
  primary4: {
    name: "Summer",
    img: summer,
    short: "Some short description for Summer wear",
    cats: ["Summer Wear"],
    links: ["/"]
  }
};

// SubCat component
function SubCat({ cats, links, handleClose }) {
  const navigate = useNavigate();

  const handleClick = (e, link) => {
    e.stopPropagation(); // prevent closing modal when clicking button
    navigate(link);
    handleClose(); // close modal after navigation
  };

  return (
    <motion.div
      onClick={handleClose}
      className="modal-back"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px"
      }}
    >
      {cats.map((catName, idx) => (
        <button
          key={idx}
          style={{border: "2px solid rgb(255, 153, 0)", color: "white", scale: "1.2", backgroundColor: "black"}} className="butt mb-4" 
          onClick={(e) => handleClick(e, links[idx])}
        >
          {catName}
        </button>
      ))}
    </motion.div>
  );
}

function Category() {
  const [showSub, setShowSub] = useState(null);

  const handleSubCat = (catsArray, linksArray) => {
    setShowSub({ cats: catsArray, links: linksArray });
  };

  const handleClose = () => {
    setShowSub(null);
  };

  const catEntries = Object.values(Cats);

  return (
    <Container className="cat-container pb-5 pt-4 mt-4">
      <Row className="mt-5">
        {catEntries.map((cat, index) => (
          <Col md={6} className="py-2" key={index}>
            <div className="catcard">
              <div style={{ cursor: "pointer" }} onClick={() => handleSubCat(cat.cats, cat.links)}>
                <CardImg className="catimg" src={cat.img || demo} />
                <div className="cat-body">
                  <h4
                    className="text-white"
                    style={{
                      borderBottom: "1px solid rgb(255, 153, 0)",
                      paddingBottom: "5px",
                      display: "inline-block"
                    }}
                  >
                    {cat.name}
                  </h4>
                  <p className="text-white">{cat.short}</p>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* AnimatePresence for Modal */}
      <AnimatePresence mode="wait">
        {showSub && (
          <SubCat
            cats={showSub.cats}
            links={showSub.links}
            handleClose={handleClose}
          />
        )}
      </AnimatePresence>
    </Container>
  );
}

export default Category;