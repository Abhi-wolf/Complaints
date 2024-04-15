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
import { toast } from "sonner";
import { useSignUp } from "./useSignUp";

function SignUp() {
  const { register, reset, handleSubmit } = useForm();
  const { signUp, isLoading } = useSignUp();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    signUp(
      { data },
      {
        onSuccess: () => {
          reset();
          toast.success("Successfully signed in");
          navigate("/login-user");
        },
        onError: (err) => {
          toast.error(err.message);
          navigate("/signup");
        },
      }
    );
  };

  return (
    <Card className="mx-auto max-w-md mt-4 md:mt-20">
      <CardHeader>
        <CardTitle className="text-4xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  placeholder="Abhijeet Kumar"
                  disabled={isLoading}
                  required
                  {...register("name")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="userid">User Id</Label>
                <Input
                  id="userid"
                  placeholder="abhi_kr158"
                  disabled={isLoading}
                  required
                  {...register("userid")}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                disabled={isLoading}
                placeholder="m@example.com"
                required
                {...register("email")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+919816253637"
                pattern="[+]{1}[0-9]{11,14}"
                disabled={isLoading}
                required
                {...register("phone")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Create an account
            </Button>
          </form>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default SignUp;
