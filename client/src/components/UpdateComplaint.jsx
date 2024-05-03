/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { useRegisterComplaint } from "@/pages/Dashboard/useRegisterComplaint";
import { toast } from "sonner";
import { useState } from "react";
import { useUpdateComplaint } from "@/pages/Dashboard/useUpdateComplaint";

export function UpdateComplaint({ isOpen, onClose, complaint }) {
  console.log(complaint);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: complaint?.fullName,
      email: complaint?.email,
      fatherName: complaint?.fatherName,
      phone: complaint?.phone,
      idProofNumber: complaint?.idProofNumber,
      address: complaint?.address,
      description: complaint?.description,
    },
  });
  const { updateComplaint, isPending } = useUpdateComplaint();
  const [document, setDocument] = useState(null);
  // const [isOpen, onClose] = useState(false);

  function handleFile(e) {
    console.log(e.target.files[0]);
    setDocument(e.target.files[0]);
  }

  const onSubmit = (data) => {
    data = { ...data, _id: complaint._id, idProofPdf: document };
    updateComplaint(
      { data },
      {
        onSuccess: () => {
          // console.log(res);
          reset();
          toast.success("Complaint successfully registered");
          onClose(!isOpen);
        },
        onError: (err) => {
          reset();
          // console.log(err);
          toast.error(err.message);
          onClose(!isOpen);
        },
      }
    );
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogTrigger asChild>
        <Button className="fixed right-1 bottom-2 " variant="outline">
          Register New Complaint
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Complaint</DialogTitle>
          <DialogDescription>
            Please fill all the fields to register new complaint
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Pedro Duarte"
                className="col-span-3"
                disabled={isPending}
                required
                {...register("fullName")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fatherName" className="text-left">
                Father Name
              </Label>
              <Input
                id="fatherName"
                required
                type="text"
                placeholder="Geoffrey Chaucer"
                disabled={isPending}
                className="col-span-3"
                {...register("fatherName")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                id="email"
                required
                type="email"
                placeholder="peduarte@emil.com"
                disabled={isPending}
                className="col-span-3"
                {...register("email")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-left">
                Contact Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+919816253637"
                pattern="[+]{1}[0-9]{11,14}"
                disabled={isPending}
                className="col-span-3"
                required
                {...register("phone")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="idProofNumber" className="text-left">
                Id Proof Number
              </Label>
              <Input
                id="idProofNumber"
                required
                type="text"
                placeholder="JKEP827368"
                disabled={isPending}
                className="col-span-3"
                {...register("idProofNumber")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-left">
                Address
              </Label>
              <Input
                id="address"
                required
                type="text"
                placeholder="Hisar, Haryana"
                disabled={isPending}
                className="col-span-3"
                {...register("address")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-left">
                Description
              </Label>
              <Textarea
                id="description"
                type="text"
                placeholder="State your complain"
                disabled={isPending}
                className="col-span-3"
                {...register("description")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="document" className="text-left">
                Upload Document
              </Label>
              <Input
                id="document"
                type="file"
                className="col-span-2"
                disabled={isPending}
                accept=".jpg, .jpeg"
                onChange={(e) => handleFile(e)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                reset();
              }}
            >
              Reset
            </Button>
            <Button type="submit" disabled={isPending}>
              Update Complaint
            </Button>
          </div>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
