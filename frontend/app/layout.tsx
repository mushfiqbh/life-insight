import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./redux-provider"; // Import the new provider
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import PreFetch from "./prefetch";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Life Insight",
  description: "Health improvement blog application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await cookies()).get("locale")?.value || "en";
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>
          <ReduxProvider>
            <PreFetch />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextIntlClientProvider locale={locale} messages={messages}>
                <Header />
                {children}
                <Footer />
              </NextIntlClientProvider>
            </ThemeProvider>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
