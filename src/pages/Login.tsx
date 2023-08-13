/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/shadcn/ui/card";
import { Input } from "../components/shadcn/ui/input";
import { Label } from "../components/shadcn/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form";
import { Checkbox } from "../components/shadcn/ui/checkbox";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { loginUser } from "../redux/features/user/userSlice";
import { useEffect } from "react";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { user, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = (data: Inputs) => {
    console.log(data);
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (user.email && !isLoading) {
      navigate("/");
    }
  }, [user.email, isLoading]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#111827]">
      <div className="flex w-3/4">
        <Card className="w-1/2 h-fit bg-[#1F2937] border-none text-white">
          <CardHeader className="flex flex-col gap-y-4">
            <div className="flex gap-x-4">
              <img src="/book.svg" alt="book-logo" className="h-16" />
              <p className="text-[#1ABC9C] text-5xl uppercase font-bold">
                Book Catalog
              </p>
            </div>
            <div className="space-y-2">
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription className="text-base flex gap-x-2 text-[#D1D5DB]">
                <p>Start your website in seconds. Don’t have an account?</p>
                <Link to="/signup">
                  <p className="text-blue-500 hover:underline">Sign up</p>
                </Link>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center gap-4">
                <div className="w-full flex flex-col space-y-4">
                  <Label htmlFor="name">Email</Label>
                  <Input
                    type="email"
                    placeholder="name@company.com"
                    className="bg-[#374151] border-none"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="w-full flex flex-col space-y-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#374151] border-none"
                    {...register("password", { required: true })}
                  />
                </div>
              </div>

              <div className="flex gap-x-4 items-center my-8">
                <hr className="bg-[#374151] w-1/2" />
                <p className="text-sm">or</p>
                <hr className="bg-[#374151] w-1/2" />
              </div>

              <div className="flex justify-between mb-4">
                <div className="flex gap-x-2 items-center">
                  <Checkbox className="border-none rounded-md bg-[#374151]" />
                  <p>Remember me</p>
                </div>
                <Link to="/forget-password">
                  <p className="text-blue-500 underline">Forgot Passowrd?</p>
                </Link>
              </div>

              <Button type="submit" className="bg-[#2563EB] w-full">
                Sign in to your account
              </Button>
            </form>

            <Button className="w-full bg-transparent border border-[#374151] flex gap-x-4 mt-4">
              <FcGoogle className="text-2xl " />
              <span>Sign in with Google</span>
            </Button>
          </CardContent>
        </Card>
        <div className="w-1/2 flex justify-end">
          <img src="/login.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
