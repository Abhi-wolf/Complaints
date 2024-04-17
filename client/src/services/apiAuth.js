import axios from "axios";

const apiURL = import.meta.env.VITE_BASE_URL;

export async function signup({ data }) {
  let userDetail = {};
  try {
    const res = await axios.post(`${apiURL}/user/register`, data);
    userDetail = res.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error(err.message);
    }
  }

  return userDetail;
}

export async function login({ data }) {
  let userDetail = {};
  try {
    if (data.role === "admin") {
      const res = await axios.post(`${apiURL}/admin/admin-login`, data);
      userDetail = res.data;
    } else {
      const res = await axios.post(`${apiURL}/user/login`, data);
      userDetail = res.data;
    }
  } catch (err) {
    console.log(err);
    if (err.response) {
      // The request was made and the server responded with a status code
      console.log(err.response.data); // Server response data
      console.log(err.response.status); // Status code
      console.log(err.response.headers); // Response headers

      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return userDetail;
}
