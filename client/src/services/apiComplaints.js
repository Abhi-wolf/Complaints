import axios from "axios";
const apiURL = import.meta.env.VITE_BASE_URL;

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
