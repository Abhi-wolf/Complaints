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
    }
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
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return userDetail;
}

export async function getUserDetails(id, token) {
  // console.log("id = ", id);
  // console.log("token = ", token);
  let user = {};

  try {
    const res = await axios.get(`${apiURL}/user/getuser/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user = res?.data?.user;
    // console.log(res.data.user);
  } catch (error) {
    console.log(error);
  }

  return user;
}

export async function updateUser({ data }, token) {
  console.log("user = ", data);
  console.log("token = ", token);
  let response = {};
  try {
    const res = await axios.put(`${apiURL}/user/updateuser/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response = res.data;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export async function getAdminDetails(id, token) {
  // console.log("id = ", id);
  // console.log("token = ", token);
  let user = {};

  try {
    const res = await axios.get(`${apiURL}/admin/getAdmin/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user = res?.data?.user;
  } catch (error) {
    console.log(error);
  }

  return user;
}

export async function updateAdmin({ data }, token) {
  let response = {};
  try {
    const res = await axios.put(`${apiURL}/admin/updateAdmin/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response = res.data;
  } catch (error) {
    console.log(error);
  }

  return response;
}

export async function getAllUsers(token) {
  // console.log("id = ", id);
  // console.log("token = ", token);
  let user = [];

  try {
    const res = await axios.get(`${apiURL}/admin/getAllUsers/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user = res?.data?.users;
    // console.log(res.data?.users);
  } catch (error) {
    console.log(error);
  }

  return user;
}

export async function sendOTP(email) {
  console.log(email);
  // let userDetail = {};
  try {
    const res = await axios.post(`${apiURL}/user/forgotpassword`, { email });
    // userDetail = res.data;
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  // return userDetail;
}

// verifyOTP
export async function verifyOTP({ data }) {
  console.log(data);
  try {
    const res = await axios.post(`${apiURL}/user/verifyOTP`, data);
    return res.data;
  } catch (err) {
    console.log(err.response.data);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }
}

// reset password
export async function resetPassword({ data }) {
  console.log(data);
  try {
    const res = await axios.post(`${apiURL}/user/resetpassword`, data);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err.response.data);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }
}
