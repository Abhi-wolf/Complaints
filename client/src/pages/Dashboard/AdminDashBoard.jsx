import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { useGetAllComplaintsAdmin } from "./useGetAllComplaints";
import Spinner from "@/components/Spinner";
import NoData from "@/components/NoData";
import ComplaintCard from "@/components/ComplaintCard";

function AdminDashBoard() {
  const { allComplaints, isPending } = useGetAllComplaintsAdmin();

  if (isPending) return <Spinner />;

  return (
    <div className=" w-full min-h-[90vh] relative">
      <div className="flex flex-row mx-2 my-2 gap-4 justify-end">
        <Button variant="secondary">Sort</Button>
        <Button variant="secondary">Filter</Button>
      </div>

      <div className=" flex flex-wrap gap-5 justify-center mx-4 my-8">
        {allComplaints.length == 0 ? (
          <NoData />
        ) : (
          allComplaints.map((complain) => (
            <ComplaintCard complain={complain} key={complain._id} view="true" />
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashBoard;
