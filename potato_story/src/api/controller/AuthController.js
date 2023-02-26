import useFetchApi from "../../hooks/useFetchApi";
import usePostApi from "../../hooks/usePostApi";
import AuthRoute from "../routes/AuthRoute";

class AuthController {
  // let data = await UserLogin({ body: { username: username, password: password } });

  static UserLogin = () => {
    const { data, loading, error, callAPI } = usePostApi(AuthRoute.USER_LOGIN, {
      publicApi: true,
    });

    const login = ({ username = "", password = "" }) => {
      if (username === "") {
        throw Error("Username cant be blank!");
      }
      if (password === "") {
        throw Error("Password cant be blank!");
      }

      return callAPI({
        body: {
          username: username,
          password: password,
        },
      });
    };

    return { loading, error, data, callAPI: login };
  };

  static UserLogout = () => {
    const { data, loading, error, callAPI } = usePostApi(AuthRoute.USER_LOGUT);
    // const logout = async () => {
        
    //     return callAPI;
    // }
    return callAPI;
  };

  static RegisterUser = () => {
    const { data, loading, error, callAPI } = usePostApi(
      AuthRoute.CREATE_USER,
      { publicApi: true }
    );

    const registeUser = async ({
      username = "",
      fullname = "",
      email = "",
      password = "",
      confirmPassword,
    }) => {
      if (username.trim() === "") {
        throw Error("Username cant be blank!");
      }
      if (fullname.trim() === "") {
        throw Error("Full name cant be blank!");
      }
      if (email.trim() === "") {
        throw Error("Email address cant be blank!");
      }
      if (password.trim() === "") {
        throw Error("Password cant be blank!");
      }

      if (password !== confirmPassword) {
        throw Error("Password doesnt match. Please try again.");
      }

      console.log(`fllname = ${fullname}`);

      return callAPI({
        body: {
          username,
          password,
          fullname,
          email_address: email,
        },
      });
    };

    return { loading, error, data, callAPI: registeUser };
  };
}

export default AuthController;
