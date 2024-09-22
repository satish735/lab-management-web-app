import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import StoreProvider from "./StoreProvider";
export const metadata = {
  title: "Path labs",
  description: "For you health",
};
import { Toaster } from "react-hot-toast";
import TooltipComponent from "@/components/TooltipComponent";
import dynamic from "next/dynamic";
import BootstrapClient from "@/components/BootstrapClient";
const TopProgressBar = dynamic(
  () => import("@/components/TopProgressBar"),
  { ssr: false }
);
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopProgressBar />
        <StoreProvider>
          {children}
          <Toaster position="bottom-left" />
        </StoreProvider>
        <TooltipComponent />
        <BootstrapClient />
      </body>
    </html>
  );
}
