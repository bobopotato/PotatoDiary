import { useEffect } from "react";
import { privateAxios } from "../api/BaseAxios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import ResponseStatusCode from "../constants/ResponseStatusCode";

const usePrivateAxios = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestInterceptor = privateAxios.interceptors.request.use(
            config => {
                // console.log(`my accesstoken = ${auth?.accessToken}`)
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config;
            }, (error) => {
                // console.log(`nani = ${error}`);
                Promise.reject(error)
            }
        )

        const responseInterceptor = privateAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === ResponseStatusCode.UNAUTHORIZED && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    // console.log(`getting new access token = ${newAccessToken}`)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return privateAxios(prevRequest);
                }
                // console.log(`nani = ${error}`);

                return Promise.reject(error);
            }
        )

        return () => {
            privateAxios.interceptors.request.eject(requestInterceptor);
            privateAxios.interceptors.response.eject(responseInterceptor);
        }

    }, [auth, refresh])

    return privateAxios;
}

export default usePrivateAxios