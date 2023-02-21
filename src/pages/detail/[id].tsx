import { useRouter } from "next/router";

const StockDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Post: {id}</p>;
};

export default StockDetailPage;
