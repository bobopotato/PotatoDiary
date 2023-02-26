
import useFetchApi from '../../hooks/useFetchApi'
import usePostApi from '../../hooks/usePostApi'
import UserRoute from '../routes/UserRoute'


class UserController {

  static GetUser = () => {
    // console.log(`refreshing static`)
    const { data, loading, error, callAPI } = useFetchApi(UserRoute.GET_ALL_USERS);
    return { loading, error, data, callAPI }
  }

  static GetUserDetails = () => {
    const { data, loading, error, callAPI } = useFetchApi(UserRoute.GET_USER_DETAILS, {remainData: true});
    return { loading, error, data, callAPI }
  }

  static UpdateUserDetails = () => {
    const { data, loading, error, callAPI } = usePostApi(UserRoute.UPDATE_USER_DETAILS);

    const updateUserDetails = ({ objUser }) => {

      if (objUser.username.trim() === '') {
        throw Error('Username cant be empty')
      }

      if (objUser.fullname.trim() === '') {
        throw Error('Fullname cant be empty')
      }

      if (objUser.email_address.trim() === '') {
        throw Error('Email address cant be empty')
      }

      return callAPI({
        body: {
          username: objUser.username,
          fullname: objUser.fullname,
          email_address: objUser.email_address,
        }
      })
    }

    return { loading, error, data, callAPI: updateUserDetails }
  }
}






export default UserController