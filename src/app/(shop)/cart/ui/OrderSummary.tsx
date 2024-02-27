"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../../../../store/cart/cart-store";
import { currencyFormat } from "../../../../utils/currencyFormat";

const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { subTotal, tax, Total, itemInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading ...</p>;
  return (
    <>
      <div className="grid grid-cols-2">
        <span>No. de Productos</span>
        <span className="text-right">{itemInCart} articulos</span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>
        <span className="mt-5 text-2xl">Total:</span>
        <span className="text-right mt-5 text-2xl">
          {currencyFormat(Total)}
        </span>
      </div>
    </>
  );
};

export default OrderSummary;
