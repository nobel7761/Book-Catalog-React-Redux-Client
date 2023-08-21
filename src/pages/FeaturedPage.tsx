import { useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { useGetSingleUserByEmailQuery } from "../redux/features/user/userApi";

const FeaturedPage = () => {
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state.user);

  console.log("email", user.email);

  const { data: userDetails } = useGetSingleUserByEmailQuery(user.email);
  console.log("user", userDetails);

  const loggedInUser = userDetails?.data;

  const books = loggedInUser.wishList.map((bookId: string) => {
    bookId;
  });
  console.log("books id", books);

  return (
    <div>
      {pathname.includes("wish-list") && "wish list"}
      {pathname.includes("read-soon") && "Read Soon"}
      {pathname.includes("read-future") && "Read Future"}
      {pathname.includes("finish-reading") && "Finish Reading"}
    </div>
  );
};

export default FeaturedPage;
