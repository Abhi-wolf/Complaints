import { useParams } from "react-router-dom";
import { useGetAllComplaints } from "./useGetComplaint";
import { Button } from "@/components/ui/button";
import { RegisterNewComplaint } from "@/components/RegisterNewComplaint";

function UserDashboard() {
  const { complaints, isLoading, error } = useGetAllComplaints();
  const { id } = useParams();

  if (isLoading) return <h1>Loading</h1>;
  else {
    console.log(id);
    console.log(complaints);
  }

  return (
    <div className="border-2 border-green-400 w-full min-h-[91vh] relative">
      <RegisterNewComplaint />
    </div>
  );
}

export default UserDashboard;
