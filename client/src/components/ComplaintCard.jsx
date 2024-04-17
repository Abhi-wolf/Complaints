/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState } from "react";

import { useDeleteComplaint } from "@/pages/Dashboard/useDeleteComplaint";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUpdateStatus } from "@/pages/Dashboard/useUpdateStatus";
import { useQueryClient } from "@tanstack/react-query";

function formatDate(dateString) {
  const date = new Date(dateString);

  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

function ComplaintCard({ complain, view }) {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [isOpen, onClose] = useState(false);
  // const [position, setPosition] = useState("processing");

  const { deleteComplaint, isPending } = useDeleteComplaint();
  const { updateStatus, isPending: isUpdating } = useUpdateStatus();
  const queryClient = useQueryClient();

  const {
    fullName,
    fatherName,
    email,
    phone,
    address,
    createdAt,
    status,
    access,
    _id: id,
  } = complain;

  function handleStatusChange(selectedPosition) {
    console.log("status = ", selectedPosition);
    // setPosition(selectedPosition);

    const data = { selectedPosition, id };
    updateStatus(
      { data },
      {
        onSuccess: (res) => {
          toast.success(`Status updated to ${res?.updatedstatus}`);
          queryClient.invalidateQueries(["complaint", id]);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  }

  function handleDelete(id) {
    console.log(id);
    deleteComplaint(
      { id },
      {
        onSuccess: () => {
          onClose(false);
          toast.success("Complaint successfully withdrawn");
        },
        onError: (err) => {
          onClose(false);
          toast.error(err.message);
        },
      }
    );
  }

  return (
    <div>
      <Card className="w-[350px] md:w-[450px]">
        <CardHeader>
          <CardTitle className="text-slate-500">{fullName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-center">
                <p className="text-md text-muted-foreground ">Created On :</p>
                <span className="scroll-m-20 text-md font-semibold tracking-tight pl-1 text-green-300">
                  {formatDate(createdAt)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-md text-muted-foreground">Father Name :</p>
                <span className="scroll-m-20 text-md font-semibold tracking-tight pl-1">
                  {fatherName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-md text-muted-foreground">Address : </p>
                <span className="scroll-m-20 text-md font-semibold tracking-tight pl-1">
                  {address}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-md text-muted-foreground">Email :</p>
                <span className="scroll-m-20 text-md font-semibold tracking-tight pl-1">
                  {email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-md text-muted-foreground">Phone :</p>
                <span className="scroll-m-20 text-md font-semibold tracking-tight pl-1">
                  {phone}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-md text-muted-foreground">Status :</p>
                {role === "user" && (
                  <Badge
                    className={`rounded-full text-xs md:text-sm ${
                      status === "rejected" && "bg-red-500"
                    } ${status === "solved" && "bg-green-500"} ${
                      status === "processing" && "bg-yellow-500"
                    } ${
                      status === "forwarded to relevant department" &&
                      "bg-orange-500"
                    } `}
                  >
                    {status}
                  </Badge>
                )}

                {role === "admin" && (
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          disabled={isUpdating}
                          className={`rounded-full text-xs md:text-sm  ${
                            status === "rejected" && "bg-red-500"
                          } ${status === "solved" && "bg-green-500"} ${
                            status === "processing" && "bg-yellow-500"
                          } ${
                            status === "forwarded to relevant department" &&
                            "bg-orange-500"
                          } `}
                        >
                          {status}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-36">
                        {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={status}
                          onValueChange={handleStatusChange}
                        >
                          <DropdownMenuRadioItem
                            value="processing"
                            className="text-yellow-500 font-semibold"
                          >
                            Processing
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem
                            value="forwarded to relevant department"
                            className="text-orange-500 font-semibold"
                          >
                            Forwarded
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem
                            value="solved"
                            className="text-green-500 font-semibold"
                          >
                            Solved
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem
                            value="rejected"
                            className="text-red-700 font-semibold"
                          >
                            Rejected
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-md text-muted-foreground">Created On :</p>
                <span className="scroll-m-20 text-md font-semibold tracking-tight pl-1">
                  {formatDate(createdAt)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {view && (
            <Button
              variant="secondary"
              onClick={() => navigate(`/complain/${id}`)}
            >
              View
            </Button>
          )}

          {role === "user" && (
            <AlertDialog
              onOpenChange={onClose}
              open={isOpen}
              modal
              defaultOpen={false}
            >
              <AlertDialogTrigger disabled={access}>
                <Button variant="destructive" disabled={access}>
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                  <Button onClick={() => handleDelete(id)} disabled={isPending}>
                    Continue
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default ComplaintCard;
