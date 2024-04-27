import { Button } from "@/components/ui/button";
import { useGetAllComplaintsAdmin } from "./useGetAllComplaints";
import Spinner from "@/components/Spinner";
import NoData from "@/components/NoData";
import ComplaintCard from "@/components/ComplaintCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

function AdminDashBoard() {
  const { allComplaints, isPending } = useGetAllComplaintsAdmin();
  const [sortSelection, setSortSelection] = useState("recent");
  const [filterSelection, setFilterSelection] = useState("all");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    let sortedAfiltered = [];
    if (allComplaints) {
      // SORTING
      if (sortSelection === "recent") {
        sortedAfiltered = [...allComplaints].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      } else {
        sortedAfiltered = [...allComplaints].sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
      }

      // FILTERING
      if (filterSelection === "rejected") {
        sortedAfiltered = [...allComplaints].filter(
          (a) => a.status === "rejected"
        );
      } else if (filterSelection === "processing") {
        sortedAfiltered = [...allComplaints].filter(
          (a) => a.status === "processing"
        );
      } else if (filterSelection === "forwarded") {
        sortedAfiltered = [...allComplaints].filter(
          (a) => a.status === "forwarded to relevant department"
        );
      } else if (filterSelection === "solved") {
        sortedAfiltered = [...allComplaints].filter(
          (a) => a.status === "solved"
        );
      }
      setComplaints(sortedAfiltered);
    }
  }, [allComplaints, sortSelection, filterSelection]);

  if (isPending) return <Spinner />;

  // console.log(complaints);

  return (
    <div className=" w-[90vw] max-h-[90vh] relative overflow-y-scroll">
      <div className="flex flex-row mx-2 my-2 gap-4 justify-end mr-4 md:mr-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Sort</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort (by date)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={sortSelection}
              onValueChange={setSortSelection}
            >
              <DropdownMenuRadioItem
                value="recent"
                className={`${sortSelection === "recent" && "bg-violet-400"}`}
              >
                Recent
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="earlier"
                className={`${sortSelection === "earlier" && "bg-violet-400"}`}
              >
                Earlier
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* FILTER MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Filter</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter (by status)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={filterSelection}
              onValueChange={setFilterSelection}
            >
              <DropdownMenuRadioItem
                value="all"
                className={`${filterSelection === "all" && "bg-violet-400"}`}
              >
                All
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="rejected"
                className={`${
                  filterSelection === "rejected" && "bg-violet-400"
                }`}
              >
                Rejected
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="processing"
                className={`${
                  filterSelection === "processing" && "bg-violet-400"
                }`}
              >
                Processing
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="solved"
                className={`${filterSelection === "solved" && "bg-violet-400"}`}
              >
                Solved
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="forwarded"
                className={`${
                  filterSelection === "forwarded" && "bg-violet-400"
                }`}
              >
                Forwarded
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
    </div>
  );
}

export default AdminDashBoard;
