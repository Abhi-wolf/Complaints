import { useParams } from "react-router-dom";
import { useGetAllComplaints } from "./useGetComplaint";
import { Button } from "@/components/ui/button";
import { RegisterNewComplaint } from "@/components/RegisterNewComplaint";
import ComplaintCard from "@/components/ComplaintCard";

function UserDashboard() {
  const { complaints, isLoading, error } = useGetAllComplaints();
  const { id } = useParams();

  if (isLoading || !complaints) return <h1>Loading</h1>;

  return (
    <div className=" w-full min-h-[91vh] relative">
      <div className="flex flex-row mx-2 my-2 gap-4 justify-end">
        <Button>Sort</Button>
        <Button>Filter</Button>
      </div>

      <div className=" flex flex-wrap gap-5 justify-center mx-4 my-8">
        {complaints.map((complain) => (
          <ComplaintCard complain={complain} key={complain._id} view="true" />
        ))}
      </div>
      <RegisterNewComplaint />
    </div>
  );
}

export default UserDashboard;
