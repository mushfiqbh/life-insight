import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./redux-provider"; // Import the new provider
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FetchData from "./fetch-data";

export const metadata: Metadata = {
  title: "Next-Redux",
  description: "Implementing Redux in Next(App Router)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <FetchData />
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
