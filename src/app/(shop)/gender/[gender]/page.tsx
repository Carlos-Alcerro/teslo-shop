export const revalidate = 60; //60 segundos
import { getPaginatedProductsWithImages } from "@/actions/index";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import Pagination from "../../../../components/ui/pagination/Pagination";
import {
  notFound,
  redirect,
} from "../../../../../node_modules/next/navigation";
import { Gender } from "@prisma/client";

interface Props {
  searchParams: {
    page?: string;
  };
  params: {
    gender: string;
  };
}

export default async function GenderPage({ searchParams, params }: Props) {
  console.log(searchParams);
  console.log(params);
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page, gender: gender as Gender });
  if (products.length === 0) {
    redirect("/");
  }

  /* if (id === "kids") {
    notFound();
  } */

  const tituloCategoty = (title: string) => {
    let nombre;
    if (title === "kid") {
      nombre = "Nino";
    } else if (title === "women") {
      nombre = "mujer";
    } else if (title === "men") {
      nombre = "Hombre";
    } else {
      nombre = "No se encontro";
    }
    return nombre;
  };

  return (
    <>
      <Title
        title="Tienda"
        subtitle={`Articulos para ${tituloCategoty(gender)}`}
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
