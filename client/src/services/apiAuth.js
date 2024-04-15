import axios from "axios";

const apiURL = import.meta.env.VITE_BASE_URL;

export async function signup({ data }) {
  let userDetail = {};
  try {
    const res = await axios.post(`${apiURL}/user/register`, data);
    userDetail = res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
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
    throw new Error(err.message);
  }

  return userDetail;
}
