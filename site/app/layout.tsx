import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProtocol ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: baseUrl,
    title: {
      default: "Revenant XSpark — One Wolven Spark",
      template: "%s | Revenant XSpark",
    },
    description:
      "The immersive home of Revenant XSpark — competitive teams, championships, creators, origin story and official merchandise.",
    openGraph: {
      title: "Revenant XSpark — One Wolven Spark",
      description:
        "Explore the wolfpack: seven competitive divisions, championship history, creators and the official Naruto merchandise collaboration.",
      url: baseUrl,
      images: [{ url: "/og.png", width: 1672, height: 941, alt: "Revenant XSpark — One Wolven Spark." }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Revenant XSpark — One Wolven Spark",
      description: "Teams. Trophies. Creators. The immersive wolfpack experience.",
      images: ["/og.png"],
    },
    icons: {
      icon: "/assets/rntx-crest-2026.webp",
      shortcut: "/assets/rntx-crest-2026.webp",
      apple: "/assets/rntx-crest-2026.webp",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
