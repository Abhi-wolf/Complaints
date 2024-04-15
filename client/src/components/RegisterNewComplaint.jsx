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

export function RegisterNewComplaint() {
  const { register, handleSubmit } = useForm();
  const { registerNewComplaint } = useRegisterComplaint();
  const [document, setDocument] = useState(null);

  function handleFile(e) {
    console.log(e.target.files[0]);
    setDocument(e.target.files[0]);
  }

  const onSubmit = (data) => {
    console.log(data);
    data = { ...data, idProofPdf: document };
    console.log(data);
    registerNewComplaint(
      { data },
      {
        onSuccess: (complaint) => {
          console.log(complaint);
          toast.success("Complaint successfully registered");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute right-1 bottom-2">
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
                className="col-span-3"
                {...register("description")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-left">
                Upload Document
              </Label>
              <Input
                id="address"
                required
                type="file"
                placeholder="Hisar, Haryana"
                className="col-span-2"
                onChange={(e) => handleFile(e)}
                // {...register("address")}
              />
            </div>
          </div>
          <Button type="submit">Register Complaint</Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
