import { comma } from "../../utils/convert";
import Card from "../atoms/Card";
import Photo from "../atoms/Photo";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import SkeletonProductCard from "./SkeletonProductCard";

const ProductCard = ({ product, isFetching }) => {
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!isFetching) {
      setIsFetched(true);
    }
  }, [isFetching]);

  return isFetched ? (
    <Card to={`/product/${product.id}`}>
      <div className={"image-wrapper min-h-[210px] overflow-hidden"}>
        <Photo
          className={
            "product-photo transition-all duration-300 ease-in-out hover:scale-[1.1] hover:shadow-xl"
          }
          src={`${staticServerUri}/images/products${product.image}`}
          alt={product.productName}
        />
      </div>
      <div
        className={
          "text-md line-clamp-2 overflow-hidden text-left font-semibold"
        }
      >
        {product.productName || <Skeleton />}
      </div>
      <div
        className={
          "product-price w-full text-left text-sm font-semibold text-gray-500"
        }
      >
        {comma(product.price || <Skeleton />)}원
      </div>
    </Card>
  ) : (
    <SkeletonProductCard />
  );
};

export default ProductCard;
