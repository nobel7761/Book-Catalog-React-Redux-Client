/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/shadcn/ui/card";
import { Input } from "../components/shadcn/ui/input";
import { Label } from "../components/shadcn/ui/label";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/user/userApi";
import { toast } from "react-toastify";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const [loginUser, { data, isError, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = (data: Inputs) => {
    const user = {
      email: data.email,
      password: data.password,
    };

    loginUser(user);
  };

  if (isSuccess) {
    const userData = JSON.stringify(data?.data);
    sessionStorage.setItem("user", userData);

    navigate("/");
    toast.success("Logged In Successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  if (isError) {
    toast.error("Something went wrong!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
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

              <Button
                type="submit"
                className="bg-[#2563EB] w-full flex items-center gap-x-3"
              >
                {/* {isLoading ? <LoadingIcon /> : null} */}
                Log in to your account
              </Button>
            </form>
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
