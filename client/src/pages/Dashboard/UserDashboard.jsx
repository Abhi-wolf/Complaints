import { Button } from "@/components/ui/button";
import { RegisterNewComplaint } from "@/components/RegisterNewComplaint";
import ComplaintCard from "@/components/ComplaintCard";
import { useGetUserComplaints } from "./useGetUserComplaints";
import Spinner from "@/components/Spinner";
import NoData from "@/components/NoData";
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

function UserDashboard() {
  const { complaints, isPending } = useGetUserComplaints();
  const [sortSelection, setSortSelection] = useState("recent");
  const [filterSelection, setFilterSelection] = useState("all");
  const [filTeredComplaints, setFilTeredComplaints] = useState([]);

  useEffect(() => {
    let sortedAfiltered = [];
    if (complaints) {
      // SORTING
      if (sortSelection === "recent") {
        sortedAfiltered = [...complaints].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      } else {
        sortedAfiltered = [...complaints].sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
      }

      // FILTERING
      if (filterSelection === "rejected") {
        sortedAfiltered = [...complaints].filter(
          (a) => a.status === "rejected"
        );
      } else if (filterSelection === "processing") {
        sortedAfiltered = [...complaints].filter(
          (a) => a.status === "processing"
        );
      } else if (filterSelection === "forwarded") {
        sortedAfiltered = [...complaints].filter(
          (a) => a.status === "forwarded to relevant department"
        );
      } else if (filterSelection === "solved") {
        sortedAfiltered = [...complaints].filter((a) => a.status === "solved");
      }
      setFilTeredComplaints(sortedAfiltered);
    }
  }, [complaints, sortSelection, filterSelection]);

  if (isPending) return <Spinner />;

  return (
    <div className=" w-full min-h-[90vh] relative">
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
        {filTeredComplaints.length == 0 ? (
          <NoData />
        ) : (
          filTeredComplaints.map((complain) => (
            <ComplaintCard complain={complain} key={complain._id} view="true" />
          ))
        )}
      </div>
      <RegisterNewComplaint />
    </div>
  );
}

export default UserDashboard;
