import React, { createContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuthInfo] = useState({});

    // const auth = useMemo(() => {
    //     if (_auth && !_auth.userInfo) {
    //         setAuthInfo(prevAuth => {
    //             const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //             return {
    //                 ...prevAuth,
    //                 id: userInfo.user_id,
    //                 username: userInfo.username,
    //                 email: userInfo.email_address,
    //                 fullname: userInfo.fullname,
    //             };
    //         })
    //     }
    //     return _auth
    // }, [_auth])

    const username = () => {
        return auth ? auth.userInfo.username : null;
    }

    const setAuth = (data) => {
        if (!data?.userInfo) return setAuthInfo(null);
        setAuthInfo({
            id: data.userInfo.user_id,
            username: data.userInfo.username,
            email: data.userInfo.email_address,
            fullname: data.userInfo.fullname,
            accessToken: data.accessToken,
        });
    }

    const updateAccessToken = (newAccessToken) => {
        setAuthInfo(prevAuth => {
            // console.log(`prev auth = ${JSON.stringify(prevAuth, null, 2)}`);
            // console.log(`new accessToken = ${newAccessToken}`);
            return { ...prevAuth, accessToken: newAccessToken };
        });
    }

    const restoreUserInfo = () => {
        if (auth && !auth.userInfo) {
            setAuthInfo(prevAuth => {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                return {
                    ...prevAuth,
                    id: userInfo.user_id,
                    username: userInfo.username,
                    email: userInfo.email_address,
                    fullname: userInfo.fullname,
                };
            })
        }
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, updateAccessToken, restoreUserInfo, username }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;