import { useGetAllComplaints } from "./useGetComplaint";

function UserDashboard() {
  const { complaints, isLoading, error } = useGetAllComplaints();

  if (isLoading) return <h1>Loading</h1>;
  else {
    console.log(complaints);
  }

  return <h1>user dashboard</h1>;
}

export default UserDashboard;
