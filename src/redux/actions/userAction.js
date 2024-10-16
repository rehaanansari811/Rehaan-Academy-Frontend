import { server } from "../store";
import axios from 'axios';

// LOGIN
export const login = (email, password) => async dispatch => {
    try {
        dispatch({ type: 'loginRequest' });
        const { data } = await axios.post(
            `${server}/login`,
            { email, password },
            {
                headers: {
                    'Content-type': 'application/json',
                },
                withCredentials: true,
            }
        );
        dispatch({ type: 'loginSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'loginFail', payload: error.response.data.message });
    }
}

// REGISTER
export const register = (formData) => async dispatch => {
    try {
        dispatch({ type: 'registerRequest' });
        const { data } = await axios.post(
            `${server}/register`,
            formData,
            {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
                withCredentials: true,
            }
        );
        dispatch({ type: 'registerSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'registerFail', payload: error.response.data.message });
    }
}

// GET PROFILE
export const getMyProfile = () => async dispatch => {
    try {
        dispatch({ type: 'loadUserRequest' });
        const { data } = await axios.get(
            `${server}/myprofile`,

            {
                withCredentials: true,
            }
        );
        dispatch({ type: 'loadUserSuccess', payload: data.user });
    } catch (error) {
        dispatch({ type: 'loadUserFail', payload: error.response.data.message });
    }
}

// LOGOUT
export const logout = () => async dispatch => {
    try {
        dispatch({ type: 'logoutRequest' });
        const { data } = await axios.get(
            `${server}/logout`,

            {
                withCredentials: true,
            }
        );
        dispatch({ type: 'logoutSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'logoutFail', payload: error.response.data.message });
    }
}

// BUY SUBSCRIPTION
export const buySubscription = () => async dispatch => {
    try {
        dispatch({ type: 'buySubscriptionRequest' });
        const { data } = await axios.get(
            `${server}/subscribe`,
            {
                withCredentials: true,
            }
        );
        dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
    } catch (error) {
        dispatch({ type: 'buySubscriptionFail', payload: error.response.data.message });
    }
}

// BUY SUBSCRIPTION
export const cancelSubscription = () => async dispatch => {
    try {
        dispatch({ type: 'cancelSubscriptionRequest' });
        const { data } = await axios.delete(
            `${server}/subscribe/cancel`,
            {
                withCredentials: true,
            }
        );
        dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
    } catch (error) {
        dispatch({ type: 'cancelSubscriptionFail', payload: error.response.data.message });
    }
}

// export const cancelSubscription = () => async dispatch => {
//     try {
//         dispatch({ type: 'cancelSubscriptionRequest' });
//         const response = await axios.delete(`${server}/subscribe/cancel`, {
//             withCredentials: true,
//         });
//         // Check if response contains data
//         const data = response?.data;
//         dispatch({ type: 'cancelSubscriptionSuccess', payload: data?.message });
//     } catch (error) {
//         dispatch({
//             type: 'cancelSubscriptionFail',
//             payload: error?.response?.data?.message || 'An error occurred',
//         });
//     }
// };



