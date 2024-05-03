import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendOTP } from "./useSendOTP";
import { toast } from "sonner";
import { useVerifyOTP } from "./useVerifyOTP";
import { useResetPassword } from "./useResetPassword";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(null);
  const [password, setPassword] = useState("");

  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const navigate = useNavigate();

  const { sendOTP, isPending } = useSendOTP();
  const { verifyOTP, isPending: isVerfiyingOTP } = useVerifyOTP();
  const { resetPassword, isPending: isResetingPassword } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);

    if (!email) return;

    if (!isOTPSent) {
      sendOTP(email, {
        onSuccess: (res) => {
          console.log(res);
          toast.success("OTP sent successfully");
          if (res.status === 200) setIsOTPSent(true);
        },
        onError: (err) => {
          toast.error(err.data.message);
        },
      });
    } else if (otp && !isOTPVerified) {
      if (!otp) return;
      const data = { email, otp };
      verifyOTP(
        { data },
        {
          onSuccess: () => {
            toast.success("OTP verified successfully");
            setIsOTPVerified(true);
          },
          onError: (err) => {
            console.log(err);
            toast.error(err);
          },
        }
      );
    } else {
      if (!isOTPVerified || !password) return;
      const data = { email, otp, password };
      resetPassword(
        { data },
        {
          onSuccess: (res) => {
            toast.success("Password reset successfull");
            if (res.status === 200) navigate("/login-user");
          },
          onError: (err) => {
            console.log(err);
            toast.error(err);
          },
        }
      );
    }
  };

  return (
    <Card className="mx-auto max-w-sm  mt-4 md:mt-20">
      <CardHeader>
        <CardTitle className="text-4xl">Forgot Password</CardTitle>
        <CardDescription>Enter your email below to send OTP</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form onSubmit={(e) => handleSubmit(e)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                disabled={isPending || isOTPSent}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {isOTPSent && (
              <div className="grid gap-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="number"
                  disabled={!isOTPSent || isOTPVerified}
                  placeholder="Enter OTP received on email"
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            )}

            {isOTPVerified && (
              <div className="grid gap-2">
                <Label htmlFor="password">OTP</Label>
                <Input
                  id="otp"
                  type="password"
                  // disabled={!isOTPSent}
                  placeholder="Enter OTP received on email"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}
            {isOTPSent ? (
              <Button
                type="submit"
                className="w-full"
                disabled={isVerfiyingOTP}
              >
                Verify OTP
              </Button>
            ) : isOTPVerified ? (
              <Button type="submit" className="w-full" disabled={isPending}>
                Reset Password
              </Button>
            ) : (
              <Button type="submit" className="w-full" disabled={isPending}>
                Send OTP
              </Button>
            )}
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

export default ForgotPassword;
