import axios from "axios";
import { useCookies } from "react-cookie";
const apiURL = import.meta.env.VITE_BASE_URL;

export async function getAllComplaintsAdmin() {
  const [cookies] = useCookies(["token"]);
  console.log("getcomplaints");
  let complaints = [];
  try {
    const res = await axios.get(`${apiURL}/complaint/get-allcomplaint`, {
      headers: {
        Authorization: cookies.token,
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
