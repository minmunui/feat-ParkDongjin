import ProductCard from "../molecules/ProductCard";

const ProductGrid = ({ products, isFetching }) => {
  return (
    <div className="product-grid grid w-[100%] max-w-[1024px] grid-cols-2 gap-4 p-4 md:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFetching={isFetching}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
