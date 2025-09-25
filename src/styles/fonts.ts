import { Bai_Jamjuree, Fredoka, Geist, Geist_Mono, IBM_Plex_Sans, Inter, Montserrat, Nunito, Oswald, Poppins, Roboto, Space_Grotesk, Trirong } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  weight: ["100", "200","300", "400","500", "600","700", "800","900"],
  subsets: ["latin", "latin-ext"], // Latin and extended Latin for broader language support
  style: "normal"
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: ["100", "200","300", "400","500", "600","700", "800","900"],
  subsets: ["latin", "latin-ext"], // Latin and extended Latin for broader language support
  style: "normal"
});

export const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200","300", "400","500", "600","700", "800","900"],
  subsets: ["latin", "latin-ext"], // Latin and extended Latin for broader language support
  style: "normal"
})

export const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200","300", "400","500", "600","700", "800","900"],
  subsets: ["latin", "latin-ext"], // Latin and extended Latin for broader language support
  style: "normal"
})

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100", "200","300", "400","500", "600","700", "800","900"],
  subsets: ["latin", "latin-ext"], // Latin and extended Latin for broader language support
  style: "normal"
})

export const oswald = Oswald({
  variable: "--font-oswald",
  weight: ["200","300", "400","500", "600","700"],
  subsets: ["latin", "latin-ext"], // Latin and extended Latin for broader language support
  style: "normal"
})

export const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["100", "200","300", "400","500", "600","700", "800","900"],
  subsets: ["latin", "latin-ext"], // Latin and extended Latin for broader language support
  style: "normal"
})

export const ibm_plex_sans = IBM_Plex_Sans({
  variable: "--font-ibm_plex_sans",
  weight: ["100", "200","300", "400","500", "600","700",],
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese", "greek"], // Latin and extended Latin for broader language support
  style: "normal"
})

export const nunito = Nunito({
  variable: "--font-nunito",
  weight: ["200","300", "400","500", "600","700", "800","900", "1000"],
  subsets: ["latin", "latin-ext"], // Latin and extended Latin for broader language support
  style: "normal"
})

export const trirong = Trirong({
  variable: "--font-trirong",
  weight: ["200","300", "400","500", "600","700", "800","900"],
  subsets: ["latin", "latin-ext"], // Latin and extended Latin for broader language support
  style: "normal"
})

// export const ui_sans_serif = {
//   variable: '--font-ui_sans_serif',
//   style: 'normal',
//   // No src or subsets needed since it's a system font
// };

export const fredoka = Fredoka({
  variable: "--font-fredoka",
  weight: ["300", "400","500", "600","700"],
  subsets: ["latin", "latin-ext"], // Latin and extended Latin for broader language support
  style: "normal"
});

export const bai_jamjuree = Bai_Jamjuree({
  variable: "--font-bai_jamjuree",
  weight: ["300", "400","500", "600","700"],
  subsets: ["latin", "latin-ext"], // Latin and extended Latin for broader language support
  style: "normal"
});

export const space_grotesk = Space_Grotesk({
  variable: "--font-space_grotesk",
  weight: ["300", "400","500", "600","700"],
  subsets: ["latin", "latin-ext"], // Latin and extended Latin for broader language support
  style: "normal"
});
