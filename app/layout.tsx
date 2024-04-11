import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "./components/nav";
import classnames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Hunter's Log",
  description: "Track your job hunt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="">
        <body
          className={classnames("inter.className", "bg-green-800 h-screen")}
        >
          <Providers>
            <Nav />
            <main className="flex flex-row justify-center text-gray-900">
              <div className="max-w-[1280px] w-full px-6">{children}</div>
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
