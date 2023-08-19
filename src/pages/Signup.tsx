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
import { useForm, SubmitHandler } from "react-hook-form";
import LoadingIcon from "../components/shared/LoadingIcon";
import { useCreateUserMutation } from "../redux/features/user/userApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
    formState: { errors },
  } = useForm<Inputs>();

  const [signUpUser, { data, error, isLoading, isSuccess, isError }] =
    useCreateUserMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
      contact: data.contact,
      wishList: [],
      readSoon: [],
      readFuture: [],
      finishReading: [],
    };

    signUpUser(user);
  };

  if (isSuccess) {
    const userData = JSON.stringify(data?.data);
    sessionStorage.setItem("user", userData);
  }

  if (isError) {
    toast.error("Something Went Wrong!", {
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

  useEffect(() => {
    if (error && "data" in error) {
      const data = error.data as { message: string } | undefined;
      toast.error(data?.message || "An error occurred");
    }

    if (isSuccess) {
      toast.success("Signed In Successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    }
  }, [isError, isSuccess, navigate, data, error]);

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

              <Button
                type="submit"
                className="bg-[#2563EB] w-full flex items-center gap-x-3"
              >
                {isLoading ? <LoadingIcon /> : null}
                Sign in to your account
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

export default Signup;
