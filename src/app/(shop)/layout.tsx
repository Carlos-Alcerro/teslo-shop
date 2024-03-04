import { TransitionPage } from "@/components/transitionPage/TransitionPage";
import Footer from "@/components/ui/footer/Footer";
import SideBar from "@/components/ui/sidebar/SideBar";
import TopMenu from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TransitionPage />
      <TopMenu />
      <SideBar />
      <div className="px-0 sm:px-5">{children}</div>
      <Footer />
    </main>
  );
}
