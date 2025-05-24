import React, { useEffect } from 'react';
import HeroSec from './HeroSec';
import BestD from "./BestDeals";
import VelouraCol from './VelouraCol';
import Deats from './Details';
import Order from './OrderPage';
import About from './AboutUs';
import {OrderBar} from './CartPage';
import ProdList from './ProductList';
import NewArr from './NewArrival';
import AdminPanel from './Admin Forms/AdminPanel';
/* import RenderItem from './Featured'; */
import Category from "./Category";
import Example from './Navbar';
import Footer from './Footer';

import Success from './PaymentStats/Success';
import Fail from './PaymentStats/Fail';
import Cancle from './PaymentStats/Cancle';
import Cod from './PaymentStats/Cod';

import ShippingPoly from './Legal Info/ShippingPoly';
import RefundPoly from './Legal Info/RefundPoly';
import PrivacyPoly from './Legal Info/PrivacyPoly';
import PaymentPoly from './Legal Info/PaymentPoly';
import TermsConditions from './Legal Info/Terms&Condition';

import { Link, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCloth, fetchOrders, fetchProdReq, fetchVouchers, addNewOrder, removeExistingOrder, toggleCartPanel, loginUser, logoutUser } from '../Redux/ActionCreators';
import { AnimatePresence, motion } from 'framer-motion';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    clothes: state.clothes,
/*     deals: state.deals,
    feats: state.feats, */
    cartPanel: state.cartPanel,
    isOpen: state.cartPanel.isOpen,
    orders: state.orders,
    prodreq: state.prodreq,
    vouchers: state.vouchers
    //cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => ({    //method defination
  fetchCloth: () => {dispatch(fetchCloth())},
  fetchOrders: () => {dispatch(fetchOrders())},
  fetchProdReq: () => {dispatch(fetchProdReq())},
  fetchVouchers: () => {dispatch(fetchVouchers())},
  addNewOrder: (order) => {dispatch(addNewOrder(order))},
  removeExistingOrder: (order_id) => {dispatch(removeExistingOrder(order_id))},
  toggleCartPanel: () => {dispatch(toggleCartPanel())},
  //toggleCartPanel: toggleCartPanel,
  loginUser: (creds) => {dispatch(loginUser(creds))},
  logoutUser: () => {dispatch(logoutUser())}
});

const ClothId = ({ clothes, addNewOrder, toggleCartPanel }) => {
  const { category, clothId } = useParams();
  console.log(category, clothId);
  const matchedCategory = clothes.find(
    (cat) => cat.category.toLowerCase() === category.toLowerCase()
  );

  const matchedItem = matchedCategory?.items.find(
    (item) => item._id === clothId
  );

  return (
    <motion.div
      transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -1000, opacity: 0 }}
    >
      <div>
        <Deats
          deats={matchedItem}
          addNewOrder={addNewOrder}
          toggleCart={toggleCartPanel}
        />
      </div>
    </motion.div>
  );
};

const TShirts = ({ clothes }) => {
  const colthList = clothes
    .filter(cloth => cloth.category === "shirt")
    .flatMap(cloth => cloth.items);

  return (
    <ProdList category="shirt" products={colthList} />
  );
};

const Polo = ({ clothes }) => {
  const colthList = clothes
    .filter(cloth => cloth.category === "polo")
    .flatMap(cloth => cloth.items);
  console.log(colthList)
  return (
    <ProdList category="polo" products={colthList} />
  );
};

const FullShirt = ({ clothes }) => {
  const colthList = clothes
    .filter(cloth => cloth.category === "full shirt")
    .flatMap(cloth => cloth.items);

  return (
    <ProdList category="full shirt" products={colthList} />
  );
};

const LuxuryShirt = ({ clothes }) => {
  const colthList = clothes
    .filter(cloth => cloth.category === "luxury shirt")
    .flatMap(cloth => cloth.items);

  return (
    <ProdList category="luxury shirt" products={colthList} />
  );
};

const LuxuryPolo = ({ clothes }) => {
  const colthList = clothes
    .filter(cloth => cloth.category === "luxury polo")
    .flatMap(cloth => cloth.items);

  return (
    <ProdList category="luxury polo" products={colthList} />
  );
};

const SummerPolo = ({ clothes }) => {
  const colthList = clothes
    .filter(cloth => cloth.category === "summer polo")
    .flatMap(cloth => cloth.items);

  return (
    <ProdList category="summer polo" products={colthList} />
  );
};

const SummerShirt = ({ clothes }) => {
  const colthList = clothes
    .filter(cloth => cloth.category === "summer shirt")
    .flatMap(cloth => cloth.items);

  return (
    <ProdList category="summer shirt" products={colthList} />
  );
};

const Home = ({ clothes }) => (
  <motion.div
    transition={{ duration: 1.2, type: "tween", ease: [0.25, 0.1, 0.25, 1] }}
    initial={{ x: 1000, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -1000, opacity: 0 }}
  >
    <HeroSec />
    <BestD clothes={clothes}/>
    <Category />
    <VelouraCol />
    <NewArr clothes={clothes}/>
  </motion.div>
);

const Main = (props) => {
  useEffect(() => {
    props.fetchProdReq();
    props.fetchOrders();
    props.fetchCloth();
    props.fetchVouchers();
  }, []);

/*   const [ordPage, setOrdpage] = useState(false);
  const handleOrd = () => {
    setOrdpage(!ordPage)
  } */

  if (props.clothes.isLoading || props.clothes.clothes.length == 0) {
    return (
       <Loading />
    );
  }

  if (props.clothes.clothes && props.clothes.clothes.length > 0) {
    return (
      <>
        <Example
          orders={props.orders.orders}
          toggleCart={props.toggleCartPanel}
/*           auth={props.auth}
          loginUser={props.loginUser}
          logoutUser={props.logoutUser}
          orders={props.orders.orders}
          clothes={props.clothes.clothes}
          cartpanel={props.cartPanel}
          isOpen={props.isOpen}
          toggleCart={props.toggleCartPanel}
          removeExistingOrder={props.removeExistingOrder} */
        />
          <Routes>
            <Route path="/home" element={<Home clothes={props.clothes} />} />
            <Route path="/home/:category/:clothId" element={<ClothId clothes={props.clothes.clothes} addNewOrder={props.addNewOrder} toggleCartPanel={props.toggleCartPanel} />} />
            
            <Route path="/home/shirt" element={<TShirts clothes={props.clothes.clothes} />} />
            <Route path="/home/polo" element={<Polo clothes={props.clothes.clothes} />} />
            <Route path="/home/full shirt" element={<FullShirt clothes={props.clothes.clothes} />} />
            <Route path="/home/luxury shirt" element={<LuxuryShirt clothes={props.clothes.clothes} />} />
            <Route path="/home/luxury polo" element={<LuxuryPolo clothes={props.clothes.clothes} />} />
            <Route path="/home/summer polo" element={<SummerPolo clothes={props.clothes.clothes} />} />
            <Route path="/home/summer shirt" element={<SummerShirt clothes={props.clothes.clothes} />} />
            
            <Route path="/home/aboutus" element={<About />} />
            <Route path="/home/orders" element={<Order orders={props.orders.orders} removeExistingOrder={props.removeExistingOrder}/>} />
            <Route path="/home/admin" element={<AdminPanel auth={props.auth} clothes={props.clothes.clothes} prodreq={props.prodreq.prodreq} vouchers={props.vouchers.vouchers} loginUser={props.loginUser} logoutUser={props.logoutUser}/>} />

            <Route path="/home/paystat/:tranId" element={<Success />} />
            <Route path="/home/failure/:tranId" element={<Fail />} />
            <Route path="/home/cancle/:tranId" element={<Cancle />} />
            <Route path="/home/cod" element={<Cod />} />

            <Route path="/home/shipping" element={<ShippingPoly />} />
            <Route path="/home/privacy" element={<PrivacyPoly />} />
            <Route path="/home/payment" element={<PaymentPoly />} />
            <Route path="/home/terms" element={<TermsConditions />} />  
            <Route path="/home/refund" element={<RefundPoly />} />          
{/*             <Route path="/home/doctors" element={<AppointmentForm />} />
            <Route path="/home/sunglass" element={<AllSun sunglasses={props.sunglass} />} />
            <Route path="/home/sunglass/men" element={<FilteredMensSun sunglasses={props.sunglass} />} />
            <Route path="/home/sunglass/women" element={<FilteredWoMensSun sunglasses={props.sunglass} />} />
            <Route path="/home/orders" element={<Order orders={props.orders.orders} removeExistingOrder={props.removeExistingOrder}/>} /> */}
            <Route
              path="*"
              element={<Navigate to="/home" replace />}
            />
          </Routes>
        <Footer />
        <AnimatePresence mode='wait'>
            {props.cartPanel.isOpen && (
              <OrderBar
                orders={props.orders}
                handleOrdPage={props.toggleCartPanel}
                removeOrder={props.removeExistingOrder}
              />
            )}
          </AnimatePresence>
      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);