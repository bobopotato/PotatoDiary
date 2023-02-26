
const AUTH_API_URL = "/api/user"; 

class AuthRoute {
    static USER_LOGIN = `${AUTH_API_URL}/login`;
    static USER_LOGUT = `${AUTH_API_URL}/logout`;
    static CREATE_USER = `${AUTH_API_URL}/createUser`;
    static REFRESH_ACCESS_TOKEN = `${AUTH_API_URL}/refreshAccessToken`;
}

export default AuthRoute;