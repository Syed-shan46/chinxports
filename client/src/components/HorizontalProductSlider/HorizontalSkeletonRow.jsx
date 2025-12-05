import ProductCardSkeleton from "../product/ProductCardSkeleton";

export default function HorizontalSkeletonRow({ count = 8, col = 4, innerRef }) {
  return (
    <div className="horizontal-slider" ref={innerRef}>
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} col={col} />
      ))}
    </div>
  );
}
