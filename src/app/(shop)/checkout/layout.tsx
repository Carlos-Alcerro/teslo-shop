import { auth } from "@/auth.config";
import { redirect } from "../../../../node_modules/next/navigation";

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }
  return <>{children}</>;
}
