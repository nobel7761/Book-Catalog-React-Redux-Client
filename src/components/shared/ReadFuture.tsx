import { toast } from "react-toastify";
import { Button } from "../shadcn/ui/button";
import LoadingIcon from "./LoadingIcon";
import { useUpdateUserReadFutureListByEmailMutation } from "../../redux/features/user/userApi";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

const ReadFuture = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);

  const [addToReadFutureList, { data, isLoading, isSuccess, isError }] =
    useUpdateUserReadFutureListByEmailMutation();

  const handleReadFutureList = () => {
    const option = {
      id: id,
      data: { email: user.email },
    };

    addToReadFutureList(option);
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
      <Button onClick={handleReadFutureList}>
        {isLoading ? <LoadingIcon /> : null}Read Future
      </Button>
    </div>
  );
};

export default ReadFuture;
