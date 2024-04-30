/* eslint-disable react/prop-types */
import { Cross2Icon, PersonIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { HomeIcon, LogOutIcon, PenIcon, Settings } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/UserContext";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { RegisterNewComplaint } from "./RegisterNewComplaint";

function SideBar({ setOpenSideBar }) {
  const [isOpen, onClose] = useState(false);

  const { setUserDetail, userName, role, userId } = useAuth();
  const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  function Logout() {
    setUserDetail({});
    setCookie("token", null, { path: "/" });
    navigate("/login-user", { replace: true });
    toast.success("Logged Out Successfully");
  }

  return (
    <div className=" w-[60px] md:w-[300px] max-h-[100vh] md:min-h-[100vh] relative shadow-lg shadow-gray-600 ">
      <Button
        onClick={() => setOpenSideBar(false)}
        className="absolute top-2 right-2"
        variant="ghost"
      >
        <Cross2Icon className="w-5 h-5" />
      </Button>

      <div className="min-h-[99vh] flex flex-col justify-between  ">
        <div className="mt-14 p-2 ">
          <NavLink
            to={`/${role}/dashboard/${userId}`}
            className={({ isActive }) =>
              `flex justify-center border-2  p-2 rounded-lg cursor-pointer items-center mt-4 gap-2 ${
                isActive ? "bg-slate-200 border-gray-500" : ""
              }`
            }
          >
            <HomeIcon className="md:mr-2 h-5 w-5 text-gray-500" />
            <span className="hidden md:inline-block text-gray-500">
              Dashboard
            </span>
          </NavLink>

          {role === "user" && (
            // biome-ignore lint/a11y/useButtonType: <explanation>
            <button
              className="w-full flex justify-center border-2  p-2 rounded-lg cursor-pointer items-center mt-4 gap-2 "
              onClick={() => onClose(true)}
            >
              <PenIcon className="md:mr-2 h-5 w-5 text-gray-500" />
              <span className="hidden md:inline-block text-gray-500">
                New Complain
              </span>
            </button>
          )}
          {isOpen && <RegisterNewComplaint isOpen={isOpen} onClose={onClose} />}

          <NavLink
            to={`/${role}/profile/${userId}`}
            className={({ isActive }) =>
              `flex justify-center border-2  p-2 rounded-lg cursor-pointer items-center mt-4 gap-2 ${
                isActive ? "bg-slate-200 border-gray-500" : ""
              }`
            }
          >
            <Settings className="md:mr-2 h-5 w-5 text-gray-500" />
            <span className="hidden md:inline-block text-gray-500">
              Settings
            </span>
          </NavLink>

          {/* ALL USER (FOR ADMIN ONLY) */}
          {role === "admin" && (
            <NavLink
              to={`/${role}/alluserdetails/`}
              className={({ isActive }) =>
                `flex justify-center border-2  p-2 rounded-lg cursor-pointer items-center mt-4 gap-2 ${
                  isActive ? "bg-slate-200 border-gray-500" : ""
                }`
              }
            >
              <PersonIcon className="md:mr-2 h-5 w-5 text-gray-500" />
              <span className="hidden md:inline-block text-gray-500">
                All Users
              </span>
            </NavLink>
          )}
        </div>

        <div className=" p-2 ">
          {/* <div className="flex justify-center border-2  p-2 rounded-lg cursor-pointer items-center mt-4 gap-2 ">
            <PersonIcon className="md:mr-2 h-5 w-5 text-gray-500" />
            <span className="hidden md:inline-block text-gray-500">
              {userName}
            </span>
          </div> */}

          <NavLink
            to="/login-user"
            onClick={Logout}
            className={({ isActive }) =>
              `flex justify-center border-2  p-2 rounded-lg cursor-pointer items-center mt-4 gap-2 ${
                isActive ? "bg-slate-200 border-gray-500" : ""
              }`
            }
          >
            <LogOutIcon className="md:mr-2 h-5 w-5 text-gray-500" />
            <span className="hidden md:inline-block text-gray-500">Logout</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
