import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER:    "LOGIN_USER",
    LOGOUT_USER:   "LOGUT_USER",
    SET_ERR:       "SET_ERR",
    REMOVE_ERR:    "REMOVE_ERR"

}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: null,
        guest: false
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: null
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: null
                })
            }
            case AuthActionType.LOGIN_USER:{
                return setAuth ({
                    user: payload.user,
                    loggedIn: true,
                    error: null
                })
            }
            case AuthActionType.LOGIN_USER:{
                return setAuth ({
                    user: null,
                    loggedIn: false,
                    error: null
                })
            }
            case AuthActionType.SET_ERR:{
                return setAuth ({
                    user: null,
                    loggedIn: false,
                    error: payload.message
                })
            }
            case AuthActionType.LOGOUT_USER:{
                return setAuth ({
                    user: null,
                    loggedIn: false,
                    error: null
                })
            }
            case AuthActionType.REMOVE_ERR:{
                return setAuth ({
                    user: null,
                    loggedIn: false,
                    error: null
                })
            }
            default:
                return auth;
        }
    }

    auth.removeError = function () {
        authReducer({
            type: AuthActionType.REMOVE_ERR,
            payload: {
                loggedIn: null,
                user: null
            }
        });
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.logoutUser = async function(userData, store){
        console.log("trying to logou");
        authReducer({
            type: AuthActionType.LOGOUT_USER,
            payload: {
                user: null
            }
        })
        history.push("/");
        
    }

    auth.loginUser = async function(userData, store){
        console.log("Attempting to Login");

        let response;
        let error;

        try {
            response = await api.loginUser(userData);
        } catch (err){
            error = err.response.data.errorMessage;
        }

        //console.log(error);

        if (response){
            if (response.status === 200) {
                console.log(response);
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                    user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
                // set home here
            }
        } else {
            authReducer({
                type: AuthActionType.SET_ERR,
                payload: {
                    message: error
                }
            });
            console.log("Here");
        }
    }

    auth.registerUser = async function(userData, store) {
        console.log("Trying to reegisster User");
        let response;
        let error;

        try {
            response = await api.registerUser(userData);
        } catch (err){
            error = err.response.data.errorMessage;
        }    

        if (response){
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        } else {
            authReducer({
                type: AuthActionType.SET_ERR,
                payload: {
                    message: error
                }
            });
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };