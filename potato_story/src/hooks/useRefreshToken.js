import React from 'react'
import useAuth from './useAuth';
import { publicAxios } from '../api/BaseAxios';
import AuthRoute from '../api/routes/AuthRoute';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../constants/ErrorMessage';
import ResponseStatusCode from '../constants/ResponseStatusCode';

const useRefreshToken = () => {
    const navigate = useNavigate();
    const { auth, setAuth, updateAccessToken, restoreUserInfo } = useAuth();

    const refresh = async () => {
        try {
            const response = await publicAxios.get(AuthRoute.REFRESH_ACCESS_TOKEN, { withCredentials: true });
            const data = response.data
            const newAccessToken = data.data.accessToken;
            updateAccessToken(newAccessToken);
            return newAccessToken
        }
        catch (err) {
            console.log(`refresh token error => ${err}`)

            if (err.response.status === ResponseStatusCode.UNAUTHORIZED) {
                forceLogOut();
                console.log(auth)
                throw (err);
            }else { //(err.response.status === ResponseStatusCode.INTERNAL_SERVER_ERROR)
                alert(ErrorMessage.SOMETHING_WENT_WRONG);
                throw (ErrorMessage.SOMETHING_WENT_WRONG);
            }
        }
    }

    const forceLogOut = () => {
        setAuth(null);
        navigate('/', { replace: true })
        alert(ErrorMessage.SESSION_END)
    }

    return refresh;
}

export default useRefreshToken