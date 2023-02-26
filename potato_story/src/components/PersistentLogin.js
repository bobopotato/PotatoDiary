import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import React from 'react'

const PersistentLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, restoreUserInfo } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
                restoreUserInfo();
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    // useEffect(() => {
    //     console.log(`isLoading : ${isLoading}`)
    //     console.log(`at token : ${JSON.stringify(auth?.accessToken)}`)
    // }, [isLoading])

    return (
        <>
            {isLoading ?
                <p>Loading...</p> :
                <Outlet />
            }
        </>
    )
}

export default PersistentLogin