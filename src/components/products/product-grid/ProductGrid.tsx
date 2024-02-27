import { Product } from "@/interfaces/product.interface";
import ProductGridItems from "./ProductGridItems";

interface Props {
  products: Product[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {products.map((product) => (
        <ProductGridItems key={product.slug} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
