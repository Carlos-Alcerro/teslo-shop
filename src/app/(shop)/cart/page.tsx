"use client";
import Title from "@/components/ui/title/Title";
import Link from "../../../../node_modules/next/link";
import { redirect } from "../../../../node_modules/next/navigation";
import OrderSummary from "./ui/OrderSummary";
import ProductsInCart from "./ui/ProductsInCart";
import { useCartStore } from "@/store";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);

  if (cart.length === 0) {
    redirect("/empty");
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* CARRITO */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas items</span>
            <Link href="/" className="underline mb-5">
              Continua comprando
            </Link>

            {/* ITEMS */}
            <ProductsInCart />
          </div>

          {/* CHECKOUT */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de Orden</h2>
            <OrderSummary />
            <div className=" mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/checkout/address"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
