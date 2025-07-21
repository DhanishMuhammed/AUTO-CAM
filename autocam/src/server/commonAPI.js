import axios from "axios";

export const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {
  const config = {
    method: httpRequest,
    url,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
  };

  if (httpRequest === "POST" || httpRequest === "PUT" || httpRequest === "PATCH") {
    config.data = reqBody;
  }

  try {
    const res = await axios(config);
    return res;
  } catch (err) {
    // This throws a clean error you can catch in uploadfile()
    throw err.response || err;
  }
};
