"use client";
import { Product } from "@/interfaces/product.interface";
import { useState } from "react";
import Image from "../../../../node_modules/next/image";
import Link from "../../../../node_modules/next/link";

interface Props {
  product: Product;
}

const ProductGridItems = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          width={500}
          height={500}
          className="w-full object-cover rounded"
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-500" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="text-md font-bold">$ {product.price}</span>
      </div>
    </div>
  );
};

export default ProductGridItems;
