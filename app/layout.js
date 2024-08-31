import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
const inter = Inter({ subsets: ["latin"] });
import StoreProvider from "./StoreProvider";
import "bootstrap/dist/css/bootstrap.min.css";
export const metadata = {
  title: "Path labs",
  description: "For you health",
};
import { Toaster } from "react-hot-toast";
import TooltipComponent from "@/components/TooltipComponent";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
          <Toaster position="bottom-left" />
        </StoreProvider>
        <TooltipComponent />
      </body>
    </html>
  );
}
