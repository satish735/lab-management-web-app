import { Inter } from "next/font/google";
// import '@/styles/globals.css'
const inter = Inter({ subsets: ["latin"] });
import StoreProvider from "./StoreProvider";
export const metadata = {
  title: "Path labs",
  description: "For you health",
};
import { Toaster } from "react-hot-toast";
import TooltipComponent from "@/components/TooltipComponent";
import dynamic from "next/dynamic";
const TopProgressBar = dynamic(
  () => import("@/components/TopProgressBar"),
  { ssr: false }
);
import BootstrapClient from "@/components/BootstrapClient";
// test
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
