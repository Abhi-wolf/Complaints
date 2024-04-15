import axios from "axios";
const apiURL = import.meta.env.VITE_BASE_URL;

// get all complaints for admin
export async function getAllComplaintsAdmin(token) {
  let complaints = [];
  try {
    const res = await axios.get(`${apiURL}/complaint/get-allcomplaint`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    complaints = res.data;
    console.log(complaints);
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }

  return complaints;
}

// get all complaints by the user
export async function getAllComplaint(token) {
  let complaints = [];
  try {
    const res = await axios.get(`${apiURL}/complaint/get-complaint`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    complaints = res.data;
    console.log(complaints);
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }

  return complaints;
}

// register new complaint
export async function registerComplaint({ data }, token) {
  console.log("data = ", data);
  console.log("token = ", token);
  let complaint = {};

  try {
    const res = await axios.post(
      `${apiURL}/complaint/register-complaint`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    complaint = res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }

  return complaint;
}
