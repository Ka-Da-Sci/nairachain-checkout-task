import type { Metadata } from "next";
import "../styles/globals.css";
import ThemeToggle from "@/components/theme-toggle";
import {
  geistSans,
  geistMono,
  roboto,
  space_grotesk,
  bai_jamjuree,
} from "@/styles/fonts";
import { cookies } from "next/headers";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Katchie Lab Website",
  description: "Elem Prosper Kachi portfolio website.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read theme from cookie on the server (async)
  const cookieStore = await cookies();
  console.log(cookieStore.get("theme")?.value);
  const themeCookie = cookieStore.get("theme")?.value;
  const themeName = cookieStore.get("theme-name")?.value;

  // Determine initial theme based on cookie only (server-side)
  const getInitialTheme = () => {
    if (themeCookie === "dark") return "dark";
    if (themeCookie === "light") return "light";
    if (themeCookie === "system") return "system";
    return "system";
  };

  // Determine initial theme name based on cookie only (server-side)
  const getInitialThemeName = () => {
    if (themeName === "dark") return "dark";
    if (themeName === "light") return "light";
    if (themeName === "system") return "system";
    return "system";
  };

  const initialTheme = getInitialTheme();
  const initialThemename = getInitialThemeName();

  return (
    <html
      lang="en"
      className={`theme-initialized ${initialTheme}`}
      data-theme={initialTheme}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}  ${bai_jamjuree.variable} ${space_grotesk.variable} antialiased font-sans bg-background-primary flex flex-col justify-between items-center w-full h-screen mx-auto overflow-x-hidden`}
      >
        <header className="hidden">
          <ThemeToggle
            initialTheme={initialTheme}
            initialThemename={initialThemename}
          />
        </header>
        <Header />
        <main className="w-full">{children}</main>
        <div className="w-full overflow-hidden shrink-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
