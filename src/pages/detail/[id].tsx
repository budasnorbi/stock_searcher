import { useRouter } from "next/router";
import { useEffect } from "react";

const StockDetailPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
  }, [router]);
  return <p></p>;
};

export default StockDetailPage;
