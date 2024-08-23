const transformErrorDefault = (mssg = "Something went wrong!", e) => {
  var message = mssg;
  if (typeof e?.response?.data == "string") {
    message = e?.response?.data;
  } else if (typeof e?.response?.data?.message == "string") {
    message = e?.response?.data?.message;
  }
  return message;
};

export default transformErrorDefault;
