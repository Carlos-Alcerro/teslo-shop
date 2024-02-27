import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import Title from "@/components/ui/title/Title";
import Image from "../../../../node_modules/next/image";
import Link from "../../../../node_modules/next/link";
import { initialData } from "../../../seed/seed";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
export default function ChackoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar Orden" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* CARRITO */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar Elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar Carrito
            </Link>

            {/* ITEMS */}
            {productsInCart.map((produt) => (
              <div className="flex mb-5" key={produt.slug}>
                <Image
                  src={`/products/${produt.images[0]}`}
                  style={{ width: "100px", height: "100px" }}
                  width={100}
                  height={100}
                  alt={produt.title}
                  className="mr-5 rounded"
                />
                <div className="">
                  <p>{produt.title}</p>
                  <p>$ {produt.price} x 3</p>
                  <p className="font-bold">Subtotal: {produt.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CHECKOUT */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Carlos Alcerro</p>
              <p>Br. Sagrado Corazon</p>
              <p>La Paz, La Paz</p>
              <p>2322-3212</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Resumen de Orden</h2>
            <div className="grid grid-cols-2">
              <span>No. de Productos</span>
              <span className="text-right">3 articulos</span>
              <span>Subtotal</span>
              <span className="text-right">$ 100</span>
              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>
              <span className="mt-5 text-2xl">Total:</span>
              <span className="text-right mt-5 text-2xl">$ 100</span>
            </div>
            <div className=" mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/orders/1234"
              >
                Colocar Orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
