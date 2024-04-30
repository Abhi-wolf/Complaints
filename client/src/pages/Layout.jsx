import Routers from "@/Routes/Routers";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/UserContext";

function Layout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const { role } = useAuth();

  return (
    <>
      {!role && <Header />}
      <main className="flex justify-between items-center ">
        {openSideBar && role && <SideBar setOpenSideBar={setOpenSideBar} />}
        {!openSideBar && role && (
          <Button onClick={() => setOpenSideBar(true)} variant="ghost">
            <DoubleArrowRightIcon className="w-4 md:w-5 h-4 md:h-8" />
          </Button>
        )}
        <Routers />
      </main>
    </>
  );
}

export default Layout;
