// // import Axios from 'axios';
// import { publicAxios } from "./BaseAxios";
// import usePrivateAxios from "../hooks/usePrivateAxios";


// const ApiService = () => {
//     const privateAxios = usePrivateAxios();

//     // PUBLIC API
//     const publicGet = ({ apiUrl, headers }) => {
//         const finalUrl = apiUrl;
//         return new Promise((resolve, reject) => {
//             publicAxios.get(finalUrl, {
//                 headers: headers,
//             }).then((res) => {
//                 const data = JSON.stringify(res.data, null, 2);
//                 console.log(`GET Method API \n${finalUrl} => \n${data}`)
//                 return resolve(res.data);
//             }).catch((err) => {
//                 return reject(err);
//             })
//         })
//     }

//     const publicPost = ({ apiUrl, params, headers }) => {
//         const finalUrl = apiUrl;
//         return new Promise((resolve, reject) => {
//             publicAxios.post(finalUrl, params, {
//                 headers: headers,
//             }).then((res) => {
//                 const data = JSON.stringify(res.data, null, 2);
//                 console.log(`POST Method API \n${finalUrl} => \n${data}`)
//                 return resolve(res.data);
//             }).catch((err) => {
//                 return reject(err);
//             })
//         })
//     }

//     // PRIVATE API

//     const privateGet = ({ apiUrl, headers }) => {
//         const finalUrl = apiUrl;
//         return new Promise((resolve, reject) => {
//             privateAxios.get(finalUrl, {
//                 headers: headers,
//             }).then((res) => {
//                 const data = JSON.stringify(res.data, null, 2);
//                 console.log(`GET Method API \n${finalUrl} => \n${data}`)
//                 return resolve(res.data);
//             }).catch((err) => {
//                 return reject(err);
//             })
//         })
//     }

//     const privatePost = ({ apiUrl, params, headers }) => {
//         const finalUrl = apiUrl;
//         return new Promise((resolve, reject) => {
//             privateAxios.post(finalUrl, params, {
//                 headers: headers,
//             }).then((res) => {
//                 const data = JSON.stringify(res.data, null, 2);
//                 console.log(`POST Method API \n${finalUrl} => \n${data}`)
//                 return resolve(res.data);
//             }).catch((err) => {
//                 return reject(err);
//             })
//         })
//     }

//     return { publicGet, publicPost, privateGet, privatePost };
// }

// export default ApiService;