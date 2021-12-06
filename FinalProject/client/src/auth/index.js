import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    ERROR_MODAL: "ERROR_MODAL",
    ERROR_MODAL_INVISIBLE: "ERROR_MODAL_INVISIBLE",
    LOGOUT_USER: "LOGOUT_USER",
    HOME_ICON:"HOME_ICON",
    GROUP_ICON:"GROUP_ICON",
    PERSON_ICON:"PERSON_ICON",
    COMMUNITY_ICON:"COMMUNITY_ICON"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: false,
        msg: null,
        page: ""
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
                    error: false,
                    msg: null,
                    page: ""
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    msg: null,
                    page: ""
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    msg: null,
                    page: "home"
                })
            }
            case AuthActionType.ERROR_MODAL: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: payload.error,
                    msg: payload.msg,
                    page: ""
                })
            }
            case AuthActionType.ERROR_MODAL_INVISIBLE: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: payload.error,
                    msg: payload.msg,
                    page: ""
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: payload.error,
                    msg: payload.msg,
                    page: ""
                })
            }
            case AuthActionType.HOME_ICON: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    error: auth.error,
                    msg: auth.msg,
                    page: "home"
                });
            }
            case AuthActionType.GROUP_ICON: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    error: auth.error,
                    msg: auth.msg,
                    page: "group"
                });
            }
            case AuthActionType.PERSON_ICON: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    error: auth.error,
                    msg: auth.msg,
                    page: "person"
                });
            }
            case AuthActionType.COMMUNITY_ICON: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    error: auth.error,
                    msg: auth.msg,
                    page: "community"
                });
            }
            default:
                return auth;
        }
    }


    auth.logoutUser = async function () {
        const response = await api.logoutUser();
        if(response.status === 200){
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: {
                    loggedIn: false,
                        user: null
                }
            });
        }
    }


    auth.handleClose = async function () {
       
        authReducer({
            type: AuthActionType.ERROR_MODAL_INVISIBLE,
            payload: {
                error: false,
                msg: null
            }
        });
        
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
        
    }

    auth.loginUser = async function (userData,store) {
        try{
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                });
                history.push("/");
                store.loadIdNamePairs();
            }
        }catch (err){
            authReducer({
                type: AuthActionType.ERROR_MODAL,
                payload: {
                    error: true,
                    msg: err.response.data.errorMessage
                }
            });
        }
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);      
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
        }catch (err){
            authReducer({
                type: AuthActionType.ERROR_MODAL,
                payload: {
                    error: true,
                    msg: err.response.data.errorMessage
                }
            });
        }
    }

    auth.HomeIcon = async function(store) {
        authReducer({
            type: AuthActionType.HOME_ICON,
            payload: {
                page:"home"
            }
        })
        history.push("/");
        store.loadIdNamePairs();
    }

    auth.GroupIcon = async function(store) {
        authReducer({
            type: AuthActionType.GROUP_ICON,
            payload: {
                page:"group"
            }
        })
        history.push("/");
        store.loadIdNamePairs();
    }

    auth.PersonIcon = async function(store) {
        authReducer({
            type: AuthActionType.PERSON_ICON,
            payload: {
                page:"person"
            }
        })
        history.push("/");
        store.loadIdNamePairs();
    }

    auth.CommunityIcon = async function(store) {
        authReducer({
            type: AuthActionType.COMMUNITY_ICON,
            payload: {
                page:"community"
            }
        })
        history.push("/");
        store.loadIdNamePairs();
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