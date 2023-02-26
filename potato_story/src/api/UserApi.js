// import ApiService from "./ApiService";

// const userApiUrl = "/api/user"; 

// class UserApi {
//     // PUBLIC API
//     static login = (params) => {
//         const { publicPost } = ApiService();
//         return publicPost({apiUrl: `${userApiUrl}/login`, params: params});
//     }

//     static refreshAccessToken = (params) => {
//         return ApiService.publicPost({apiUrl: `${userApiUrl}/refreshAccessToken`, params: params});
//     }

//     //PRIVATE API
//     static getAllUsers = ({headers}) => {
//         return ApiService.privateGet({apiUrl: `${userApiUrl}/getUsers`, headers: headers});
//     }

// }

// export default UserApi;