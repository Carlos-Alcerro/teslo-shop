import { titleFont } from "@/config/fonts";
import Image from "../../../../node_modules/next/image";
import Link from "../../../../node_modules/next/link";

const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5 ">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl ">Upsss! Lo sentimos mucho</p>
        <p className="font-light">
          <span>Puedes regregar al </span>
          <Link className="font-normal hover:underline transition-all" href="/">
            inicio
          </Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Imagen 404"
          className="p-5 sm:p-0"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
};

export default PageNotFound;
