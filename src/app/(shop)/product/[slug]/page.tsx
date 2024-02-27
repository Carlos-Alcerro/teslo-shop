export const revalidate = 604800; //7dias
import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import SizeSelector from "@/components/product/size-selector/SizeSelector";
import ProductMobileSlideshow from "@/components/product/slideshow/ProductMobileSlideshow";
import ProductSlideshow from "@/components/product/slideshow/ProductSlideshow";
import StockLabel from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config/fonts";
import { notFound } from "../../../../../node_modules/next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import AddToCart from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  /* const previousImages = (await parent).openGraph?.images || [] */

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? " ",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? " ",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function SlugId({ params }: Props) {
  const { slug } = params;

  const producto = await getProductBySlug(slug);
  if (!producto) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* SLIDESHOW */}
      <div className="col-span-1 md:col-span-2 ">
        {/* MOBILESLIDESHOW */}
        <ProductMobileSlideshow
          images={producto.images}
          title={producto.title}
          className="block md:hidden"
        />

        {/* DESKTOPSLIDESHOW */}
        <ProductSlideshow
          title={producto.title}
          images={producto.images}
          key={producto.slug}
          className="hidden md:block"
        />
      </div>

      {/* DETALLES */}
      <div className="col-span-1 px-5 ">
        <StockLabel slug={producto.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl `}>
          {producto.title}
        </h1>
        <p className="text-lg mb-5">${producto.price}</p>
        <AddToCart producto={producto} />

        <h3 className="font-bold text-sm ">Descripcion</h3>
        <p className="font-light">{producto.description}</p>
      </div>
    </div>
  );
}
