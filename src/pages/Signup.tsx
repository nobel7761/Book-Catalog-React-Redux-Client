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
import { createUser } from "../redux/features/user/userSlice";
import { useEffect } from "react";
import LoadingIcon from "../components/shared/LoadingIcon";

interface Inputs {
  name: string;
  email: string;
  password: string;
  contact: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(createUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (user.email && !isLoading) {
      navigate("/");
    }
  }, [user.email, isLoading]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#111827]">
      <div className="flex w-3/4">
        <Card className="w-1/2 h-fit  bg-[#1F2937] border-none text-white">
          <CardHeader className="flex flex-col gap-y-4">
            <div className="flex gap-x-4">
              <img src="/book.svg" alt="book-logo" className="h-16" />
              <p className="text-[#1ABC9C] text-5xl uppercase font-bold">
                Book Catalog
              </p>
            </div>
            <div className="space-y-2">
              <CardTitle>Create your Account</CardTitle>
              <CardDescription className="text-base flex gap-x-2 text-[#D1D5DB]">
                <p>Start your website in seconds. Already have an account?</p>
                <Link to="/login">
                  <p className="text-blue-500 hover:underline">Login here</p>
                </Link>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-full flex flex-col space-y-4">
                  <Label htmlFor="name">Full Name</Label>
                  <div>
                    <Input
                      type="text"
                      placeholder="e.g. Habibur Nobel"
                      className="bg-[#374151] border-none"
                      {...register("name", { required: "Name is required" })}
                    />
                    <p className="text-xs text-red-500 px-2 pt-1">
                      {errors.name && errors.name.message}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col space-y-4">
                  <Label htmlFor="email">Email</Label>
                  <div>
                    <Input
                      type="email"
                      placeholder="name@company.com"
                      className="bg-[#374151] border-none"
                      {...register("email", { required: "Email is required" })}
                    />
                    <p className="text-xs text-red-500 px-2 pt-1">
                      {errors.email && errors.email.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-full flex flex-col space-y-4">
                  <Label htmlFor="contact">Contact Number</Label>
                  <div>
                    <Input
                      type="text"
                      placeholder="01XXXXXXXXX"
                      className="bg-[#374151] border-none"
                      {...register("contact", {
                        required: "Contact Number is required",
                      })}
                    />
                    <p className="text-xs text-red-500 px-2 pt-1">
                      {errors.contact && errors.contact.message}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col space-y-4">
                  <Label htmlFor="password">Password</Label>
                  <div>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-[#374151] border-none"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <p className="text-xs text-red-500 px-2 pt-1">
                      {errors.password && errors.password.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-x-4 items-center">
                <hr className="bg-[#374151] w-1/2" />
                <p className="text-sm">or</p>
                <hr className="bg-[#374151] w-1/2" />
              </div>

              <div className="flex justify-between">
                <div className="flex gap-x-2 items-center">
                  <Checkbox className="border-none rounded-md bg-[#374151]" />
                  <p>Remember me</p>
                </div>
                <Link to="/forget-password">
                  <p className="text-blue-500 underline">Forgot Passowrd?</p>
                </Link>
              </div>

              <Button
                type="submit"
                className="bg-[#2563EB] w-full flex items-center gap-x-3"
              >
                {isLoading ? <LoadingIcon /> : null}
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

export default Signup;
