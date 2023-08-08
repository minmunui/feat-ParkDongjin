import { useInfiniteQuery } from "react-query";
import { fetchProducts } from "../services/product";
import { useEffect, useState } from "react";
import _ from "lodash";
import { MAX_PAGE_SIZE } from "../utils/constants";

export default function useFetchProducts() {
  const [products, setProducts] = useState([]);

  const infiniteQuery = useInfiniteQuery(
    ["products"],
    async ({ pageParam = 0 }) => fetchProducts(pageParam),

    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < MAX_PAGE_SIZE) {
          return undefined;
        } else {
          return allPages?.length;
        }
      },
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    // 한번 더 데이터를 검증해서 중복되는 데이터를 제거한다.
    if (infiniteQuery.data) {
      const allFetchedProducts = infiniteQuery.data.pages.flat();
      setProducts((prev) => _.unionBy([...prev, ...allFetchedProducts], "id"));
    }
  }, [infiniteQuery.data]);

  return {
    products,
    ...infiniteQuery,
  };
}
