import Spinner from "@/components/Spinner";
import { useGetAllUsers } from "./useGetAllUser";
import UserTable from "@/components/UserTable";

function AllUsersDashboard() {
  const { users, isPending } = useGetAllUsers();

  if (isPending) return <Spinner />;
  if (!users) return <div>No data present</div>;
  console.log(users);

  return (
    <div className="w-[80vw] md:w-[90vw] max-h-[100vh] md:min-h-[100vh] relative overflow-y-scroll  ">
      <div className="m-2 md:m-8  md:w-[95%]">
        {users && <UserTable data={users} />}
      </div>
    </div>
  );
}

export default AllUsersDashboard;
