import { useAuth } from "@/context/UserContext";
import { useGetUser } from "./useGetUser";
import Spinner from "@/components/Spinner";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateUser } from "./useUpdateUser";
import { toast } from "sonner";

function firstTwoLetters(name) {
  name.replace(/^\s+|\s+$/g, "");
  return name.substring(0, 2);
}

function UserSettings() {
  const { userName } = useAuth();
  const { user, isPending } = useGetUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
    },
  });

  function onSubmit(newUser) {
    let data = {};

    if (
      newUser.name === user?.name &&
      newUser.phone === user?.phone &&
      newUser.password === ""
    ) {
      return;
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (newUser.password === "") {
      let { password, ...rest } = newUser;
      data = rest;
    } else {
      data = newUser;
    }
    console.log(data);
    updateUser(
      { data },
      {
        onSuccess: () => {
          toast.success("Successfully updated");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
    // reset();
  }

  useEffect(() => {
    reset({
      name: user?.name,
      phone: user?.phone,
    });
  }, [user]);

  if (isPending) return <Spinner />;

  return (
    <div className="w-[80vw] md:w-[90vw] max-h-[100vh] md:min-h-[100vh] relative overflow-y-scroll  ">
      <div className="m-2 md:m-8  md:w-[95%]">
        <div className="border-b pb-2">
          <h1 className="scroll-m-20  text-4xl font-semibold tracking-tight first:mt-0">
            Settings
          </h1>

          <p className="text-lg pt-1 text-muted-foreground">
            Manage your account settings
          </p>
        </div>

        <div className=" flex gap-4 md:gap-14 h-[90%] flex-wrap ">
          {/* figure */}
          <div className="flex justify-center items-center p-4">
            {userName && (
              <div className="text-2xl md:text-4xl uppercase text-gray-500 bg-slate-300 rounded-full w-[100px] h-[100px] flex justify-center items-center">
                {firstTwoLetters(userName)}
              </div>
            )}
          </div>

          {/* user details */}
          <div className="w-[100%] md:w-1/2 mt-4">
            <div>
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                Your Profile
              </h2>
              <p className="text-md  text-muted-foreground">
                Manage your account settings
              </p>
              <Separator className="my-4" />
            </div>

            <form
              className="flex flex-col gap-4 md:gap-6"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="on"
            >
              <div>
                <Label className="text-md">User Id</Label>
                <Input
                  type="text"
                  value={user.userid}
                  disabled
                  className="text-md mt-2"
                />
                <p className="text-sm  text-muted-foreground mt-1">
                  User id cannot be changed once created.
                </p>
              </div>
              <div>
                <Label className="text-md">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  required
                  className="text-md mt-2"
                  {...register("name")}
                />
                <p className="text-sm  text-muted-foreground mt-1">
                  This name will be used through out this application for your
                  account.
                </p>
              </div>
              <div>
                <Label className="text-md">Email</Label>
                <Input
                  type="email"
                  value={user.email}
                  disabled
                  className="text-md mt-2"
                />
                <p className="text-sm  text-muted-foreground mt-1">
                  Email cannot be updated. This is the email that will be used
                  through out this application.
                </p>
              </div>
              <div>
                <Label className="text-md">Phone</Label>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="+919816253637"
                  pattern="[+]{1}[0-9]{11,14}"
                  className="text-md mt-2"
                  {...register("phone")}
                />
                <p className="text-sm  text-muted-foreground mt-1">
                  Phone number can be updated.
                </p>
              </div>
              <div>
                <Label className="text-md">Password</Label>
                <Input
                  type="password"
                  placeholder="*************"
                  className="text-md mt-2"
                  {...register("password")}
                />
                <p className="text-sm  text-muted-foreground mt-1">
                  Password can be chnaged.
                </p>
              </div>

              <Button>Update Profile</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
