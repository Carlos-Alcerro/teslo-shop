"use client";
import { titleFont } from "@/config/fonts";
import Link from "../../../../node_modules/next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { useUIStore } from "../../../store/ui/ui-store";
import { useCartStore } from "../../../store/cart/cart-store";
import { useEffect, useState } from "react";

const TopMenu = () => {
  const TotalItemInCart = useCartStore((state) => state.getTotalItems());
  const openMenu = useUIStore((state) => state.openSideMenu);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Ninos
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link
          href={TotalItemInCart === 0 && loaded ? "/empty" : "/cart"}
          className="mx-2"
        >
          <div className="relative">
            {loaded && TotalItemInCart > 0 && (
              <span className="fade-In absolute text-xs rounded-full px-1 font-bold -top-2 bg-blue-700 text-white -right-2">
                {TotalItemInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          onClick={() => openMenu()}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};

export default TopMenu;
