import * as ActionTypes from './ActionTypes';
import { baseUrl } from "./shared/baseurl"

//Actual//

export const clothesLoading = () => ({
    type: ActionTypes.CLOTHES_FAILED
});
  
export const clothFailed = (errmess) => ({
    type: ActionTypes.CLOTHES_FAILED,
    payload: errmess
});
  
export const addcloth = (cloth) => ({
    type: ActionTypes.ADD_CLOTHES,
    payload: cloth
});
  
export const fetchCloth = () => async (dispatch) => {
    dispatch(clothesLoading(true));
  
    try {
      const response = await fetch(baseUrl + "clothes");
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const clothes = await response.json();
      
      dispatch(addcloth(clothes));
    } catch (error) {
      dispatch(clothFailed(error.message));
    }
};

export const toggleCartPanel = () => ({
    type: ActionTypes.TOGGLE_CART_PANEL
});

export const fetchProdReq = () => (dispatch) => {
    dispatch(prodreqLoading(true));
  
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    return fetch(baseUrl + "orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}` // Attach token here
        }
    })
    .then(response => {
        if (response.ok) {
            console.log("HEy NIGGA");
            return response.json();
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    })
    .then(clothes => dispatch(addProdreq(clothes)))
    .catch(error => dispatch(prodreqFailed(error.message)));
}

export const prodreqLoading = () => ({
    type: ActionTypes.PRODREQ_LOADING
});
  
export const prodreqFailed = (errmess) => ({
    type: ActionTypes.PRODREQ_FAILED,
    payload: errmess
});
  
export const addProdreq = (cloth) => ({
    type: ActionTypes.ADD_PRODREQ,
    payload: cloth
});

export const addOrders = (orders) => ({
    type: ActionTypes.ADD_ORDERS,
    payload: orders
});

export const addOrder = (order) => ({
    type: ActionTypes.ADD_ORDER,
    payload: order
});

export const orderFailed = (errMess) => ({
    type: ActionTypes.ORDERS_FAILED,
    payload: errMess
});

export const fetchOrders = () => (dispatch) => {
    try {
        const ordersFromStorage = JSON.parse(localStorage.getItem('Velorders')) || [];
        dispatch(addOrders(ordersFromStorage));
    } catch (error) {
        dispatch(orderFailed(error.message));
    }
};

export const addNewOrder = (order) => (dispatch) => {
    try {
        const ordersFromStorage = JSON.parse(localStorage.getItem('Velorders')) || [];
        ordersFromStorage.push(order);
        localStorage.setItem('Velorders', JSON.stringify(ordersFromStorage));
        dispatch(addOrder(order));
    } catch (error) {
        dispatch(orderFailed(error.message));
    }
};

export const removeExistingOrder = (order_id) => (dispatch) => {
    try {
        let ordersFromStorage = JSON.parse(localStorage.getItem('Velorders')) || [];
        ordersFromStorage = ordersFromStorage.filter(o => !(o.cart_id === order_id));
        localStorage.setItem('Velorders', JSON.stringify(ordersFromStorage));
        dispatch(fetchOrders());
    } catch (error) {
        dispatch(orderFailed(error.message));
    }
};

export const fetchVouchers = () => (dispatch) => {
    dispatch(voucherLoading(true));
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    return fetch(baseUrl + "voucher", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}` // Attach token here
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    })
    .then(clothes => dispatch(addvoucher(clothes)))
    .catch(error => dispatch(voucherFailed(error.message)));
}

export const voucherLoading = () => ({
    type: ActionTypes.VOUCHER_LOADING
});
  
export const voucherFailed = (errmess) => ({
    type: ActionTypes.VOUCHER_FAILED,
    payload: errmess
});
  
export const addvoucher = (cloth) => ({
    type: ActionTypes.ADD_VOUCHERS,
    payload: cloth
});

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json',
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            dispatch(receiveLogin(response));
            dispatch(fetchProdReq());
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}

//Actual End//

