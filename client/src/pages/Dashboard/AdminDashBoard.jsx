import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { useGetAllComplaintsAdmin } from "./useGetAllComplaints";

function AdminDashBoard() {
  const [cookies] = useCookies(["token"]);
  const { allComplaints, isLoading } = useGetAllComplaintsAdmin();

  if (isLoading) return <h1>Loading</h1>;
  else {
    console.log(allComplaints);
  }

  return (
    <div>
      <Button>Get Complaints</Button>
    </div>
  );
}

export default AdminDashBoard;
