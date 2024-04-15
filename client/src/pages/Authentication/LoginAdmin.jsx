import { Link, useNavigate } from "react-router-dom";
const apiURL = import.meta.env.VITE_BASE_URL;

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

export function LoginAdmin() {
  const [cookies, setCookie] = useCookies(["token"]);
  const { register, reset, handleSubmit } = useForm({
    email: "",
    password: "",
    role: "admin",
  });
  const { setUserDetail } = useAuth();
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data = { ...data, role: "admin" };
    login(
      { data },
      {
        onSuccess: (user) => {
          reset();
          setCookie("token", user.data.token, { path: "/" });
          setUserDetail(user.data);
          toast.success("Logged in successfully");
          navigate("/admin/profile/me");
        },
        onError: (err) => {
          toast.error(err.message);
          navigate("/login-admin");
        },
      }
    );
  };

  return (
    <Card className="mx-auto max-w-sm  mt-4 md:mt-20">
      <CardHeader>
        <CardTitle className="text-4xl">Admin Login</CardTitle>
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
                disabled={isLoading}
                required
                {...register("email")}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>

              <Input
                id="password"
                type="password"
                disabled={isLoading}
                required
                {...register("password")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Role</Label>
              <Input
                id="role"
                type="text"
                placeholder="Admin"
                disabled={true}
                required
                {...register("role")}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Login
            </Button>
          </form>
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

export default LoginAdmin;
