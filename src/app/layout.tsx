import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Holiday.io | Your Paradise. Better Together.",
  description: "A global community for travelers, nomads, and locals finding home through adventure and meaningful connection.",
  keywords: ["Holiday", "Travel", "Community", "Bali", "Adventure", "Digital Nomad", "Connection"],
  openGraph: {
    title: "Holiday.io",
    description: "Your Paradise. Better Together.",
    images: ["/hero-community.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
