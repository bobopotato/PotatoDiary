import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;

// setAuth({
//     id: data.userInfo.id,
//     username: data.userInfo.username,
//     email: data.userInfo.email_address,
//     fullname: data.userInfo.fullname,
//     accessToken: data.accessToken,
// });