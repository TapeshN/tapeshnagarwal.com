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
  title: "Tapesh Nagarwal — Software Engineer",
  description:
    "Seven years building reliable distributed systems and release infrastructure. Now architecting an outer/inner-loop multi-agent platform on the Anthropic MCP protocol.",
  openGraph: {
    title: "Tapesh Nagarwal — Software Engineer",
    description:
      "Shipping agentic systems that work in production. Building TapQuality.ai — multi-agent orchestration for release readiness.",
    url: "https://tapeshnagarwal.com",
    siteName: "Tapesh Nagarwal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tapesh Nagarwal — Software Engineer",
    description:
      "Shipping agentic systems that work in production.",
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
