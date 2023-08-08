import ProductGrid from "../organisms/ProductGrid";

import { useEffect, useRef } from "react";

import ErrorSign from "../atoms/ErrorSign";
import Carousel from "../molecules/Carousel";
import useFetchProducts from "../../hooks/useFetchProducts";

const IMAGES = [
  "/images/carousel/carouselItem1.jpeg",
  "/images/carousel/carouselitem2.jpeg",
  "/images/carousel/carouselitem3.jpeg",
];

const MainProductTemplate = ({ children }) => {
  const bottomObserver = useRef(null);
  const {
    isFetchingNextPage, // 다음 페이지를 가져오는 요청이 진행 중인지 여부
    error,
    hasNextPage,
    fetchNextPage, // 다음 페이지를 가져오는 함수
    products,
    isFetching,
  } = useFetchProducts();

  useEffect(() => {
    // console.log("MainProductTemplate products", products);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    if (bottomObserver.current && hasNextPage) {
      io.observe(bottomObserver.current);
    }
    return () => {
      io.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, products]);

  useEffect(() => {
    if (error) {
      console.error(error.message);
      alert("서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
    }
  }, [error]);

  console.log("products", products);

  return (
    <div className="main-product-template flex max-w-[1380px] flex-col items-center justify-center gap-4">
      <Carousel images={IMAGES} />
      {products && <ProductGrid products={products} isFetching={isFetching} />}
      {error && <ErrorSign error={error.response} />}
      <div ref={bottomObserver}></div>
    </div>
  );
};

export default MainProductTemplate;
