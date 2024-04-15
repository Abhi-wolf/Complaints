import { useEffect } from "react";
import { useGetAllComplaints } from "./useGetAllComplaints";
import { Button } from "@/components/ui/button";

function AdminDashBoard() {
  const { allComplaints, isLoading } = useGetAllComplaints();

  if (isLoading) return <h1>Loading</h1>;

  return (
    <div>
      <Button>Get Complaints</Button>
    </div>
  );
}

export default AdminDashBoard;
