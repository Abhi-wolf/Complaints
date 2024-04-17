import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RegisterNewComplaint } from "@/components/RegisterNewComplaint";
import ComplaintCard from "@/components/ComplaintCard";
import { useGetUserComplaints } from "./useGetUserComplaints";
import Spinner from "@/components/Spinner";
import NoData from "@/components/NoData";
import { toast } from "sonner";

function UserDashboard() {
  const { complaints, isPending, error } = useGetUserComplaints();
  const { id } = useParams();

  if (isPending) return <Spinner />;
  // if (!complaints || complaints.length == 0) return <NoData />;
  // if (error) {
  //   toast.error(error.message);
  // }

  return (
    <div className=" w-full min-h-[90vh] relative">
      <div className="flex flex-row mx-2 my-2 gap-4 justify-end">
        <Button variant="secondary">Sort</Button>
        <Button variant="secondary">Filter</Button>
      </div>

      <div className=" flex flex-wrap gap-5 justify-center mx-4 my-8">
        {complaints.length == 0 ? (
          <NoData />
        ) : (
          complaints.map((complain) => (
            <ComplaintCard complain={complain} key={complain._id} view="true" />
          ))
        )}
      </div>
      <RegisterNewComplaint />
    </div>
  );
}

export default UserDashboard;
