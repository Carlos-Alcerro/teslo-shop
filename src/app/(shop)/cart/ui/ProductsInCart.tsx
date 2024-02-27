"use client";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import { useEffect, useState } from "react";
import Image from "../../../../../node_modules/next/image";
import Link from "../../../../../node_modules/next/link";
import { useCartStore } from "../../../../store/cart/cart-store";
const ProductsInCart = () => {
  const deleteProductInCart = useCartStore(
    (state) => state.deleteProductInCart
  );
  const updateProductToCart = useCartStore(
    (state) => state.updateProductToCart
  );
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    <p>Loading...</p>;
  }
  return (
    <>
      {productsInCart.map((product) => (
        <div className="flex mb-5" key={`${product.slug}-${product.size}`}>
          <Image
            src={`/products/${product.image}`}
            style={{ width: "100px", height: "100px" }}
            width={100}
            height={100}
            alt={product.title}
            className="mr-5 rounded"
          />
          <div className="">
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>
            <p>$ {product.price}</p>
            <QuantitySelector
              onQuantityChange={(quantity) =>
                updateProductToCart(product, quantity)
              }
              quantity={product.quantity}
            />
            <button
              onClick={() => deleteProductInCart(product)}
              className="underline mt-3"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsInCart;
