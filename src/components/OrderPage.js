import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardImg,
  Container,
  Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb } from './BreadCrumb';
import axios from 'axios';
import { baseUrl } from '../Redux/shared/baseurl';
import { motion, useInView as Fview } from "framer-motion";
import MediaQuery from 'react-responsive';
import pp from "../images/sslcom.png"

const steps = [
  { number: 1, label: 'Cart' },
  { number: 2, label: 'Order' },
  { number: 3, label: 'Payment' }
];

function Order (props) {
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('online');

  const [deliveryZone, setDeliveryZone] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [error, setError] = useState('');

  const [agreeTerm, setagreeTerm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [payerror, setPayerror] = useState("");

  const finalTotal = total - discount;

  const handleChangeTerm = (e) => {
    setagreeTerm(!agreeTerm)
  };

  const handleVoucherChange = (e) => {
    setVoucher(e.target.value);
    setError('');
    setVoucherApplied(false);
    setDiscount(0);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlezone = (zone) => {
    setDeliveryZone(zone);
    if (zone === "outside") {
      setDeliveryFee(120);
    } else if (zone === "inside") {
      setDeliveryFee(70);
    }
  };

    const [formData, setFormData] = useState({
      firstName: '',
      /* lastName: '', */
      phoneNumber: '',
      address: '',
      email: '',
      delivery: deliveryFee,
      total: finalTotal,
      items: []
    });
  
    useEffect(() => {
      const total = props.orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
      setTotal(total)
    }, [props.orders]);

    useEffect(() => {
      const savedFormData = localStorage.getItem('VelouraFormData');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData((prevData) => ({
          ...prevData,
          firstName: parsedData.firstName || '',
/*           lastName: parsedData.lastName || '', */
          phoneNumber: parsedData.phoneNumber || '',
          address: parsedData.address || '',
          email: parsedData.email || '',
        }));
      }
    }, []);
  
    useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        delivery: deliveryFee,
        total: finalTotal + deliveryFee,
        items: props.orders,
      }));
    }, [finalTotal, deliveryFee, props.orders]);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const submitVoucher = async () => {
      try {
        const response = await axios.post(`${baseUrl}voucher`, { name: voucher });
        console.log(response)
        const value = response.data.value; // Assuming 'value' is a percentage like 10
  
        setDiscount((total * value) / 100);
        setVoucherApplied(true);
        setError('');
      } catch (err) {
        setVoucherApplied(false);
        setDiscount(0);
        setError('Invalid or expired voucher.');
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault(); 
      setError("");
      setLoading(true);
    
      localStorage.setItem('VelouraFormData', JSON.stringify(formData));
    
      const orderToSubmit = {
        ...formData,
        order_stat: paymentMethod
      };
    
      // Validation
      if (formData.firstName === "") {
        setLoading(false);
        return alert("Please type your first name");
      }
      if (formData.phoneNumber === "") {
        setLoading(false);
        return alert("Please type your phone number");
      }
      if (formData.address === "") {
        setLoading(false);
        return alert("Please type your address");
      }
      if (formData.email === "") {
        setLoading(false);
        return alert("Please enter a valid email address");
      }
      if (formData.total <= 0) {
        setLoading(false);
        return alert("Please add items to your cart first");
      }
      if (deliveryZone === null) {
        setLoading(false);
        return alert("Select a delivery zone first");
      }
      if (!agreeTerm) {
        setLoading(false);
        return alert("You must agree to terms and conditions");
      }
    
      try {
        // Decide which endpoint to hit
        const endpoint = paymentMethod === "cod" ? `${baseUrl}orders/cod` : `${baseUrl}orders`;
    
        const response = await axios.post(endpoint, orderToSubmit, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        // For online payment, open the payment gateway URL
        if (paymentMethod !== "cod") {
          window.open(response.data.url);
        } else {
          alert("Order placed successfully with Cash on Delivery.");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          setError(error.response.data.message || "Something went wrong.");
        } else if (error.request) {
          console.error("No response received:", error.request);
          setError("No response from server.");
        } else {
          console.error("Error submitting order:", error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <motion.div
      transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
      initial = {{x: 1000, opacity: 0}}
      animate= {{x: 0, opacity: 1}}
      exit= {{x: -1000, opacity: 0}}>
          <div>
            <MediaQuery maxWidth={639}>
              <Breadcrumb items={[
                { link: '/home', active: false },
                { name: "", link: '', active: true }
              ]} />
            </MediaQuery>
            <Container style={{maxWidth: "88%"}}>
              <MediaQuery minWidth={640}>
                  <Breadcrumb items={[
                    { link: '/home', active: false },
                    { name: "", link: '', active: true }
                  ]} />
              </MediaQuery>
            <Container className="text-center mt-5 mb-4">
              <Row className="justify-content-center">
                {steps.map((step, idx) => {
                  const isLast = idx === steps.length - 1;

                  return (
                    <Col xs={4} key={idx} className="d-flex flex-column align-items-center">
                      <div
                        className="mb-2 d-flex justify-content-center align-items-center"
                        style={{
                          width: '60px',
                          height: '60px',
                          backgroundColor: isLast ? 'transparent' : '#ff9900',
                          border: isLast ? '2px solid black' : 'none',
                          color: isLast ? 'black' : 'white',
                          fontSize: '1.5rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {step.number}
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>{step.label}</div>
                    </Col>
                  );
                })}
              </Row>
            </Container>
            <p className='text-center pb-5 pt-3'>Fill out necessary information</p>
            <Container className="pb-5">
              <Row className="no-gutters align-items-start">
                <Col md={6}>
                  <h2 className="text-center mb-4">Customer Details</h2>
                    <Form /* onSubmit={handleSubmit} */>
                      <FormGroup>
                        <Label>Recipient Name</Label>
                          <Input
                            style={{
                              border: "1px solid black",
                              backgroundColor: "transparent",
                            }}
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                      </FormGroup>
{/*                       <FormGroup>
                        <Label>Last Name</Label>
                          <Input
                            style={{
                                border: "1px solid black",
                                backgroundColor: "transparent",
                              }}
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                      </FormGroup> */}
                      <FormGroup>
                        <Label>Recipient Number</Label>
                          <Input
                            style={{
                                border: "1px solid black",
                                backgroundColor: "transparent",
                              }}
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                          />
                      </FormGroup>
                      <FormGroup>
                        <Label>Email</Label>
                          <Input
                            style={{
                                border: "1px solid black",
                                backgroundColor: "transparent",
                              }}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                      </FormGroup>
                      <FormGroup>
                        <Label>Shipping Address</Label>
                          <Input
                            style={{
                                border: "1px solid black",
                                backgroundColor: "transparent",
                              }}
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                      </FormGroup>
                    </Form>
                    <h2 className='text-center mt-4'>Select Delivery Zone</h2>
                    <div>
                      <div
                        className='text-center mt-4'
                        onClick={() => handlezone('inside')}
                        style={{
                          border: "1px solid black",
                          padding: "40px",
                          position: "relative",
                          cursor: "pointer"
                        }}
                      >
                        Collect from inside khulna with a delivery charge of 70TK
                        {deliveryZone === 'inside' && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                              color: "grey",
                              padding: "5px 10px",
                              fontSize: "12px"
                            }}
                          >
                            Selected
                          </div>
                        )}
                        <p className='text-center pt-1 text-muted'>Delivery Time 5 days</p>
                      </div>

                      <div
                        className='text-center mt-2'
                        onClick={() => handlezone('outside')}
                        style={{
                          border: "1px solid black",
                          padding: "40px",
                          position: "relative",
                          cursor: "pointer"
                        }}
                      >
                        Collect from outside khulna with a delivery charge of 120TK
                        {deliveryZone === 'outside' && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                              color: "grey",
                              padding: "5px 10px",
                              fontSize: "12px"
                            }}
                          >
                            Selected
                          </div>
                        )}
                        <p className='text-center pt-1 text-muted'>Delivery Time 1 day</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={1}></Col>
                <Col md={5} className="p-2 pt-5">
                  <ul className='p-3' style={{ padding: 0, listStyleType: 'none' }}>
                    {props.orders.length > 0 ? (
                      props.orders.map((order, index) => (
                        <React.Fragment key={index}>
                          <Row>
                            <Col md={4} className="mx-0">
                              <CardImg className='mb-4' src={order.image} alt={order.name} />
                            </Col>
                            <Col md={8}>
                              <strong>{order.name}<br /></strong>
                              <strong>Size</strong> {order.size}<br />
                              <strong>Quantity</strong> {order.quantity}<br />
                              <div className='d-flex'>
                                <p className='mr-2'>Color </p>
                                <div className='color-options d-flex justify-content-center'>
                                  <div
                                    className="color-box"
                                    style={{
                                        backgroundColor: order.color,
                                        width: '25px',
                                        height: '25px',
                                        marginRight: '10px',
                                        borderRadius: '50%',
                                    }}
                                  />
                                </div>
                              </div>
                              <strong>Price:</strong> {order.price * order.quantity} Tk<br />
                            </Col>
                          </Row>
                          <div className='pb-4 pt-3' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className='butt' outline onClick={() => props.removeExistingOrder(order.cart_id)}>Remove</button>
                          </div>
                        </React.Fragment>
                      ))
                    ) : (
                      <h3 className='text-center'>No items in cart</h3>
                    )}
                  </ul>
                  <div>
                    <FormGroup style={{ width: "75%" }} className="pb-2">
                      <Label for="voucher" className="mb-1">Voucher</Label>
                      <div className="voucher">
                        <Input
                          type="text"
                          id="voucher"
                          name="voucher"
                          value={voucher}
                          onChange={handleVoucherChange}
                          placeholder="Enter voucher"
                          className="flex-grow-1 mr-2 voucherInp"
                        />
                        <div className="butt" onClick={submitVoucher}>
                          Apply
                        </div>
                      </div>
                    </FormGroup>
                    <h5 className='pb-2'>Delivery Fee: {deliveryFee}TK</h5>
                    <h4>
                      <strong>Total:</strong> {(finalTotal + deliveryFee).toFixed(2)} Tk
                    </h4>

                    {voucherApplied && (
                      <Alert color="success" className="mt-2">
                        Voucher applied successfully! You saved {discount.toFixed(2)} Tk.
                      </Alert>
                    )}

                    {error && (
                      <Alert color="danger" className="mt-2">
                        {error}
                      </Alert>
                    )}
                  </div>
                  <div className="d-flex flex-wrap align-items-center">
                    <FormGroup check className="mr-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={handlePaymentChange}
                        />
                          Cash on Delivery
                      </Label>
                    </FormGroup>
                    <FormGroup check className="mr-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={paymentMethod === 'online'}
                          onChange={handlePaymentChange}
                        />
                        Online Payment
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="paymentMethod"
                          value="partialcod"
                          checked={paymentMethod === 'partialcod'}
                          onChange={handlePaymentChange}
                        />
                        Partial Payment
                      </Label>
                    </FormGroup>
                    {paymentMethod == "cod" && (
                      <p className='pt-2 text-muted'>Make Full payment after product has been delivered</p>
                    )}
                    {paymentMethod == "online" && (
                      <p className='pt-2 text-muted'>Make the full payment online</p>
                    )}
                    {paymentMethod == "partialcod" && (
                      <p className='pt-2 text-muted'>Only pay the delivery fee pay product fee after product arrival</p>
                    )}
                      <Label className='mt-2'>
                        <input
                          className='mr-2'
                          type="checkbox"
                          checked={agreeTerm}
                          onChange={handleChangeTerm}
                        />
                        I agree to the&nbsp;
                        <Link style={{ textDecoration: "none", color: "black", cursor: "pointer" }} to="/terms" target="_blank">Terms & Conditions</Link>,&nbsp;
                        <Link style={{ textDecoration: "none", color: "black", cursor: "pointer" }} to="/privacy-policy" target="_blank">Privacy Policy</Link>, and&nbsp;
                        <Link style={{ textDecoration: "none", color: "black", cursor: "pointer" }} to="/return-policy" target="_blank">Return & Refund Policy</Link>.
                      </Label>
                  </div>
                  <div className='pt-3 home-butt'>
                    <button
                      className='butt'
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      Confirm Order
                    </button>
                    {loading && <p className='pt-2'>Please wait while we process your order...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                  </div>
                  <h5 className='pt-4 pb-1'>Pay with</h5>
                  <img style={{maxWidth: "150px"}} src={pp}/>
                  <p className='pt-2'>Includes all payment methods bikash, nagad, visa, mastercard etc....</p>
                </Col>
              </Row>
            </Container>
            </Container>
        </div>
      </motion.div>
    )
}

export default Order