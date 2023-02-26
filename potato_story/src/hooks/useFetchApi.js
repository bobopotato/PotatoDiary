import { useEffect, useMemo, useState, useRef } from "react";
import { publicAxios } from "../api/BaseAxios";
import ErrorMessage from "../constants/ErrorMessage";
import ResponseStatusCode from "../constants/ResponseStatusCode";
import usePrivateAxios from "./usePrivateAxios";

const useFetchApi = (
  url,
  { params, publicApi = false, remainData = false, resultPerPage } = {}
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentPage = useRef();
  const privateAxios = usePrivateAxios();

  useEffect(() => {
    setData(null);
    currentPage.current = 1;
    callAPI();
  }, [url, params]);

  const callAPI = async (appendKey) => {
    let axios = privateAxios;
    if (publicApi) {
      axios = publicAxios;
    }

    if (!remainData && data == null) {
      setLoading(true);
    }

    if (error) setError(null);

    try {
      const res = await axios.get(url, {
        params: { ...params, currentPage: currentPage.current, resultPerPage },
      });
      const data = res.data.data;
      console.log(data);

      if (!resultPerPage || !appendKey) {
        setData(data);

        if (resultPerPage) {
          currentPage.current += 1;
        }
      } else {
        setData((prev) => {
          let result = { ...prev };
          result.noMoreData = data.noMoreData;
          result[appendKey] = result[appendKey].concat(data[appendKey]);
          console.log(`new data = `);
          console.log(data[appendKey]);
          return result;
        });
        currentPage.current += 1;
      }
    } catch (err) {
      if (err.response.status === ResponseStatusCode.INTERNAL_SERVER_ERROR) {
        // 500 means internal server error
        // so we can't display interal server error msg
        // here only display custom message
        setError(ErrorMessage.FAILED_TO_FETCH_DATA);
      } else {
        const errMsg = err.response.data;
        setError(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };
  //  console.log(`rendering api`)
  // useMemo(() => console.log(`rendering api`), [data, loading, error])

  return useMemo(
    () => ({ data, loading, error, callAPI }),
    [data, loading, error]
  );
};

export default useFetchApi;
