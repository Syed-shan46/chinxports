import ProductCardSkeleton from "../product/ProductCardSkeleton";

export default function StoreProductsSkeleton({ count = 12, colLg = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} col={4} colLg={colLg} cartBtnPdg="5px 18px" />
      ))}
    </>
  );
}
