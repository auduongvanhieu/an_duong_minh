import { API_URL } from './configs';
import React, { createContext, useEffect, useReducer } from 'react';
import { action, myReducer } from './reducer';
import { axiosApp, loginCheckWidthError } from './rest';

const initContext = {
    users: [],
};

export const WidgetContext = createContext(); //nó à thằng này

const AppProvider = (props) => {
    const fetchUsers = () => {
        axiosApp
            .get(`/user/list`)
            .then((data) => {
                dispatch({
                    type: action.FETCH_USER_SUCCESS,
                    payload: data.data.data,
                });
            })
            .catch((e) => {
                loginCheckWidthError(e);
            });
    };
    const initContext = {
        users: [],
        handles: {
            fetchUsers,
        }
    };
    const { children, defaultValues } = props;
    const [state, dispatch] = useReducer(myReducer, {
        ...defaultValues,
        ...initContext,
    });
    useEffect(() => {
        axiosApp
            .get(`/user/list`)
            .then((data) => {
                dispatch({
                    type: action.FETCH_USER_SUCCESS,
                    payload: data.data.data,
                });
            })
            .catch((e) => {
                loginCheckWidthError(e);
            });
        axiosApp
            .get(`/user/current`)
            .then((data) => {
                console.log('CurrentUser: ', data);
                dispatch({
                    type: action.FETCH_CURRENT_USER_SUCCESS,
                    payload: data.data.data,
                });
            })
            .catch((e) => {
                loginCheckWidthError(e);
            });
    }, []);
    
    return (
        <WidgetContext.Provider value={{ state, dispatch }}>
            {children}
        </WidgetContext.Provider>
    );
};

export default AppProvider;
