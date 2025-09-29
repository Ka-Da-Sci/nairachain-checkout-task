import type { Metadata } from "next";
import "../styles/globals.css";
import ThemeToggle from "@/components/theme-toggle";
import {
  geistSans,
  geistMono,
  roboto,
  space_grotesk,
  bai_jamjuree,
  poppins,
  inter,
  montserrat,
} from "@/styles/fonts";
import { cookies } from "next/headers";
import Footer from "@/components/footer";
import RootLayoutWrapper from "@/components/root-layout-wrapper";

// Define metadata for the application, including SEO and Open Graph data
export const metadata: Metadata = {
  metadataBase: new URL("https://nairachain-checkout-task.vercel.app"),

  title: {
    default: "NairaChain Checkout Task",
    template: "%s | NairaChain Checkout Task",
  },
  description: "NairaChain checkout task completed by Elem Prosper Kachi.",
  icons: { icon: "/images/logo-trans.svg" },

  openGraph: {
    title: "NairaChain Checkout Task",
    description: "NairaChain checkout task completed by Elem Prosper Kachi.",
    url: "https://nairachain-checkout-task.vercel.app",
    siteName: "NairaChain Checkout Task",
    images: [{ url: "/images/logo-trans.svg" }],
  },
};

// Define metadata for the application, including SEO and Open Graph data
const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // Read theme from cookie on the server (async)
  const cookieStore = await cookies();
  // console.log(cookieStore.get("theme")?.value);
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
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}  ${bai_jamjuree.variable} ${space_grotesk.variable}  ${inter.variable} ${poppins.variable} ${montserrat.variable} antialiased font-sans bg-background-primary flex flex-col justify-between items-center w-full h-screen mx-auto overflow-x-hidden`}
      >
        {/* Hidden header containing the ThemeToggle component as the dark mode styles have not been added though the set up is there. */}
        <div className="hidden">
          <ThemeToggle
            initialTheme={initialTheme}
            initialThemename={initialThemename}
          />
        </div>

        {/* Wrap children in RootLayoutWrapper for consistent layout structure */}
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
        <div className="w-full overflow-hidden shrink-0">
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
