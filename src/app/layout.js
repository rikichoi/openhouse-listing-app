import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>OpenHouse</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
