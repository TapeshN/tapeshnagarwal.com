import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-mono",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Tapesh Nagarwal — Founder, TapQuality AI",
  description:
    "Senior QE/SDET with 7 years who turned a quality obsession into a governed AI engineering org. Founder of TapQuality AI — multi-agent systems that prove software works before it ships.",
  openGraph: {
    title: "Tapesh Nagarwal — Founder, TapQuality AI",
    description:
      "The human principal who designed and runs TapQuality's multi-agent factory. Most engineers ship code; this person built a system that ships software and proves it.",
    url: "https://tapeshnagarwal.com",
    siteName: "Tapesh Nagarwal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tapesh Nagarwal — Founder, TapQuality AI",
    description:
      "Senior QE/SDET who built a governed AI engineering org. Founder of TapQuality AI.",
  },
  metadataBase: new URL("https://tapeshnagarwal.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* No-flash theme init — must be inline, synchronous */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');if(s==='light'||s==='dark')document.documentElement.setAttribute('data-theme',s);})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
