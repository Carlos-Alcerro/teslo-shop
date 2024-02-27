"use client";
import SizeSelector from "@/components/product/size-selector/SizeSelector";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import {
  Product,
  CartProduct,
} from "../../../../../interfaces/product.interface";
import { Size } from "@/interfaces/product.interface";
import { useState } from "react";
import { useCartStore } from "../../../../../store/cart/cart-store";

interface Props {
  producto: Product;
}

const AddToCart = ({ producto }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    /* console.log({ size, quantity, producto }); */
    const cartProduct: CartProduct = {
      id: producto.id,
      slug: producto.slug,
      title: producto.title,
      price: producto.price,
      quantity: quantity,
      size: size,
      image: producto.images[0],
    };
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };
  return (
    <>
      {posted && !size && (
        <p className="mt-2 text-red-500 ">Debe de seleccionar una talla*</p>
      )}
      {/* SELECTOR DE TALLAS  */}
      <SizeSelector
        selectedSize={size}
        avilableSizes={producto.sizes}
        onSizeChange={(size) => setSize(size)}
      />

      {/* SELECTOR DE CANTIDAD */}
      <QuantitySelector onQuantityChange={setQuantity} quantity={quantity} />

      <button onClick={() => addToCart()} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};

export default AddToCart;
