import { auth } from "@/auth.config";
import { redirect } from "../../../node_modules/next/navigation";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">{children}</div>
    </main>
  );
}
