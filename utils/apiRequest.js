const apiRequest = async ({
  url = "",
  method = "GET",
  params = null,
  body = null,
  headers = {},
  other = {},
}) => {
  var response = {
    status: "pending",
    data: null,
    error: null,
  };
  try {
    var requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...other,
    };
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    const queryParams = null;
    if (params) {
      params = new URLSearchParams(params);
    }
    const reqResponse = await fetch(
      `${url}${queryParams ? "?" + queryParams : ""}`,
      requestOptions
    );
    console.log(reqResponse.headers.get("content-type"));
    var responseData = await reqResponse.json();
    if (!reqResponse.ok) {
      response.status = "error";
      response.error = responseData;
    } else {
      response.status = "success";
      response.data = responseData;
    }
    return response;
  } catch (error) {
    response.status = "error";
    response.error = error;
    return response;
  }
};
export default apiRequest;
