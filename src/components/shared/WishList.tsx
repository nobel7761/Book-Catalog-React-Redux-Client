import { useParams } from "react-router-dom";
import { Button } from "../shadcn/ui/button";
import { useUpdateUserWishListByEmailMutation } from "../../redux/features/user/userApi";
import { toast } from "react-toastify";
import LoadingIcon from "./LoadingIcon";
import { useAppSelector } from "../../redux/hook";

export type IUser = {
  _id?: string;
  name: string;
  contact: string;
  email: string;
  password: string;
  wishList: string[];
  readSoon: string[];
  readFuture: string[];
  finishReading: string[];
};

const WishList = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);

  const [addToWishList, { data, isLoading, isSuccess, isError }] =
    useUpdateUserWishListByEmailMutation();

  const handleWishList = () => {
    const option = {
      id: id,
      data: { email: user.email },
    };

    addToWishList(option);
  };

  if (isSuccess) {
    toast.success(data.message, {
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
    toast.error("Something Went Wrong", {
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
    <div>
      <Button onClick={() => handleWishList()}>
        {isLoading ? <LoadingIcon /> : null}
        Add to Wish List
      </Button>
    </div>
  );
};

export default WishList;
