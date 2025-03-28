import type { Metadata } from "next";
import { Providers } from './providers';
import '@rainbow-me/rainbowkit/styles.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "AML Verification of Crypto Wallets",
  description: "AML verification of crypto wallets",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
