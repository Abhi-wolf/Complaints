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
    complaints = res.data.data;
    // console.log(complaints);
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return complaints;
}

// get all complaints by the user
export async function getAllComplaint(token) {
  let complaints = [];
  try {
    const res = await axios.get(`${apiURL}/complaint/get-usercomplaints`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    complaints = res.data.data;
    // console.log(complaints);
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return complaints;
}

// register new complaint
export async function registerComplaint({ data }, token) {
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
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return complaint;
}

export async function deleteComplaint({ id }, token) {
  try {
    const res = await axios.delete(`${apiURL}/complaint/delete-complaint`, {
      data: { id }, // Pass the data as part of the config object
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    // complaint = res.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return {};
}

export async function getComplaint(id, token) {
  // console.log("token = ", token);
  // console.log("id = ", id);

  let complaint = {};
  try {
    const res = await axios.get(`${apiURL}/complaint/get-complaint/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    complaint = res.data.data;
    console.log(complaint);
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return complaint;
}

export async function updateStatusOfComplaint({ data }, token) {
  // console.log("data = ", data);
  // console.log("token = ", token);

  const { selectedPosition: status, id } = data;
  // console.log(status, id);
  let response = {};

  try {
    const res = await axios.put(
      `${apiURL}/complaint/update-status/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    response = res.data;
    console.log(response);
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return response;
}

// update complaint
export async function updateComplaint({ data }, token) {
  let complaint = {};

  try {
    const res = await axios.patch(
      `${apiURL}/complaint/update-details/${data._id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    complaint = res.data;
    console.log(complaint);
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return complaint;
}
