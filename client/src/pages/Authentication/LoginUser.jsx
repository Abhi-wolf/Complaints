import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/UserContext";
import { useLogin } from "./useLogin";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export function LoginUser() {
  const [seePassword, setSeePassword] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const { register, reset, handleSubmit } = useForm();
  const { setUserDetail } = useAuth();
  const { login, isPending } = useLogin();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(isPending);
    login(
      { data },
      {
        onSuccess: (user) => {
          reset();
          console.log(isPending);

          setUserDetail(user.data);
          setCookie("token", user.data.token, { path: "/" });
          toast.success("Logged in successfully");
          navigate(`/user/dashboard/${user.data.id}`);
        },
        onError: (err) => {
          toast.error(err.message);
          reset();
          navigate("/login-user");
        },
      }
    );
  };

  return (
    <Card className="mx-auto max-w-sm  mt-4 md:mt-20">
      <CardHeader>
        <CardTitle className="text-4xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                disabled={isPending}
                required
                {...register("email")}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgotpassword"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={seePassword ? "text" : "password"}
                  disabled={isPending}
                  required
                  {...register("password")}
                />

                {!seePassword ? (
                  <EyeOffIcon
                    className="absolute right-2 bottom-2 cursor-pointer"
                    onClick={() => setSeePassword(true)}
                  />
                ) : (
                  <EyeIcon
                    className="absolute right-2 bottom-2 cursor-pointer"
                    onClick={() => setSeePassword(false)}
                  />
                )}
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              Login
            </Button>
          </form>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoginUser;
