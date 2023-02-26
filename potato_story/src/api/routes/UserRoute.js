

const USER_API_URL = "/api/user"; 

class UserRoute {
    static GET_ALL_USERS = `${USER_API_URL}/getUsers`;
    static GET_USER_DETAILS = `${USER_API_URL}/getUserDetails`;
    static UPDATE_USER_DETAILS = `${USER_API_URL}/updateUserDetails`;
}

export default UserRoute;