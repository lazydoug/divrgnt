import { Cormorant_Garamond, Italianno } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
});

const italianno = Italianno({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italianno",
});

export const metadata = {
  title: "A Personal Archive",
  description: "Some doors only open for the person they were made for.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${italianno.variable}`}>
      <body>{children}</body>
    </html>
  );
}
