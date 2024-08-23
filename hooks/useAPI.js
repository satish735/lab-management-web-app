import axios from "axios";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import LocalStorageHelper from "../services/LocalStorageHelper";
const useAPI = (
  {
    fullURL = null,
    url = "",
    method = "GET",
    sendImmediately = false,
    authRequired = true,
    params = null,
    body = null,
    headers = null,
    isAsync = false,
  },
  dataTransform = null,
  errorTransform = null
) => {
  //   const router = useRouter();
  const APIKey = "";
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (sendImmediately) {
      immediateCall();
    }
  }, []);
  const immediateCall = async () => {
    await execute();
  };

  const catchErrorHandlerAsync = async (error) => {
    if (error?.response?.status != 401) {
      if (errorTransform) {
        var resultData = await errorTransform(error);
        setError(resultData);
      } else {
        setError(error);
      }
    } else {
      // LocalStorageHelper.removeItem("token");
      window.location.reload(false);
    }
    setFetching(false);
    setData(null);
  };
  const catchErrorHandler = (error) => {
    if (error?.response?.status != 401) {
      if (errorTransform) {
        var resultData = errorTransform(error);
        setError(resultData);
      } else {
        setError(error);
      }
    } else {
      // LocalStorageHelper.removeItem("token");
      window.location.reload(false);
    }
    setFetching(false);
    setData(null);
  };
  const thenSuccessHandlerAsync = async (response) => {
    if (dataTransform) {
      var resultData = await dataTransform(response?.data);
      setData(resultData);
    } else {
      setData(response?.data);
    }
    setFetching(false);
    setError(null);
  };
  const thenSuccessHandler = (response) => {
    if (dataTransform) {
      var resultData = dataTransform(response?.data);
      setData(resultData);
    } else {
      setData(response?.data);
    }
    setFetching(false);
    setError(null);
  };

  const execute = async (newProps) => {
    setFetching(true);
    var newurl =
      newProps?.url === undefined || newProps?.url === null
        ? url
        : newProps?.url;
    var fullurl = fullURL ?? "/api" + newurl;
    var tokenHeader = {};
    if (authRequired) {
      tokenHeader.Authorization = `Bearer ${APIKey}`;
    }
    var newheaders = {};
    if (newProps?.headers !== undefined && newProps?.headers !== null) {
      newheaders = {
        ...newProps?.headers,
        ...tokenHeader,
        method: method,
      };
    } else if (headers) {
      newheaders = {
        ...headers,
        ...tokenHeader,
        method: method,
      };
    } else {
      newheaders = {
        "Content-Type": "application/json;  charset=utf-8",
        ...tokenHeader,
        method: method,
      };
    }
    var newparams = {};
    if (newProps?.params !== undefined && newProps?.params !== null) {
      newparams = { ...newProps?.params };
    } else if (params) {
      newparams = { ...params };
    }
    var newbody = null;
    if (newProps?.body !== undefined && newProps?.body !== null) {
      newbody = newProps?.body;
    } else {
      newbody = body;
    }
    // console.log(newheaders);
    switch (method.toUpperCase()) {
      case "GET":
        axios
          .get(fullurl, { params: { ...newparams }, headers: newheaders })
          .then(isAsync ? thenSuccessHandlerAsync : thenSuccessHandler)
          .catch(isAsync ? catchErrorHandlerAsync : catchErrorHandler);
        break;
      case "POST":
        axios
          .post(fullurl, newbody, {
            headers: {
              ...newheaders,
            },
          })
          .then(isAsync ? thenSuccessHandlerAsync : thenSuccessHandler)
          .catch(isAsync ? catchErrorHandlerAsync : catchErrorHandler);
        break;
      case "PUT":
        axios
          .put(fullurl, newbody, {
            headers: {
              ...newheaders,
            },
          })
          .then(isAsync ? thenSuccessHandlerAsync : thenSuccessHandler)
          .catch(isAsync ? catchErrorHandlerAsync : catchErrorHandler);
        break;
      case "DELETE":
        axios
          .delete(fullurl, {
            headers: {
              ...newheaders,
            },
          })
          .then(isAsync ? thenSuccessHandlerAsync : thenSuccessHandler)
          .catch(isAsync ? catchErrorHandlerAsync : catchErrorHandler);
        break;
      default:
        break;
    }
  };

  return [{ data, fetching, error }, execute];
};

export default useAPI;
