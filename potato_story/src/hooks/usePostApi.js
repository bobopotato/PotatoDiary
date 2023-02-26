
import { useEffect, useState, useMemo, useCallback } from 'react';
import { publicAxios } from '../api/BaseAxios';
import ErrorMessage from '../constants/ErrorMessage';
import ResponseStatusCode from '../constants/ResponseStatusCode';
import usePrivateAxios from './usePrivateAxios';

const usePostApi = (url, { publicApi = false } = {}) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const privateAxios = usePrivateAxios();

    // useEffect(() => {
    //     callAPI(url);
    // }, [url])

    const callAPI = useCallback(async ({ body, params } = {}) => {
        let axios = privateAxios;
        if (publicApi) {
            axios = publicAxios;
        }

        setLoading(true);
        if (error) setError(null);
        try {
            const res = await axios.post(url, body, { params: params });
            const data = res.data;

            // if (data.success) {
            console.log(data);
            setData(data.data);
            return data.data;
            // return Promise.resolve(data.data);
            // }
            // else {
            //     setError(data.message);
            //     return Promise.reject(data.message);
            // }
        }
        catch (err) {

            if (err.response.status === ResponseStatusCode.INTERNAL_SERVER_ERROR) {
                // 500 means internal server error
                // so we can't display interal server error msg
                // here only display custom message 
                const errMsg = ErrorMessage.SOMETHING_WENT_WRONG
                setError(errMsg);
                throw errMsg;
            }
            else {
                const errMsg = err.response.data;
                setError(errMsg);
                throw errMsg;
            }

            // setError(err);
            // return Promise.reject(err);
        }
        finally {
            setLoading(false);
        }

    })

    return useMemo(() => ({ data, loading, error, callAPI, setError }));
}

export default usePostApi