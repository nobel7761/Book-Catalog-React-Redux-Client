import { useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { useGetSingleUserByEmailQuery } from "../redux/features/user/userApi";
import FeaturedComponent from "../components/shared/FeaturedComponent";

const FeaturedPage = () => {
  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading } = useGetSingleUserByEmailQuery(user.email, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 1000,
  });

  const wishListArray = data?.data?.wishList;
  const readSoonArray = data?.data?.readSoon;
  const readFutureArray = data?.data?.readFuture;
  const finishReadingArray = data?.data?.finishReading;

  return (
    <div>
      {pathname.includes("wish-list") && !isLoading && (
        <div className="mb-8">
          <h1 className="text-[#1ABC9C] underline text-5xl text-center uppercase font-bold my-8">
            Wish List Books
          </h1>
          <div className="grid grid-cols-2 gap-8">
            {wishListArray.length < 0 ? (
              <p>No Book Found!</p>
            ) : (
              wishListArray.map((bookId: string) => (
                <FeaturedComponent id={bookId} />
              ))
            )}
          </div>
        </div>
      )}
      {pathname.includes("read-soon") && !isLoading && (
        <div className="mb-8">
          <h1 className="text-[#1ABC9C] underline text-5xl text-center uppercase font-bold my-8">
            Read Soon Book List
          </h1>
          <div className="grid grid-cols-2 gap-8">
            {readSoonArray.length < 0 ? (
              <p>No Book Found!</p>
            ) : (
              readSoonArray.map((bookId: string) => (
                <FeaturedComponent id={bookId} />
              ))
            )}
          </div>
        </div>
      )}
      {pathname.includes("read-future") && !isLoading && (
        <div className="mb-8">
          <h1 className="text-[#1ABC9C] underline text-5xl text-center uppercase font-bold my-8">
            Read Soon Book List
          </h1>
          <div className="grid grid-cols-2 gap-8">
            {readFutureArray.length < 0 ? (
              <p>No Book Found!</p>
            ) : (
              readFutureArray.map((bookId: string) => (
                <FeaturedComponent id={bookId} />
              ))
            )}
          </div>
        </div>
      )}
      {pathname.includes("finish-reading") && !isLoading && (
        <div className="mb-8">
          <h1 className="text-[#1ABC9C] underline text-5xl text-center uppercase font-bold my-8">
            Finish Reading Book List
          </h1>
          <div className="grid grid-cols-2 gap-8">
            {finishReadingArray.length < 0 ? (
              <p>No Book Found!</p>
            ) : (
              finishReadingArray.map((bookId: string) => (
                <FeaturedComponent id={bookId} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedPage;
