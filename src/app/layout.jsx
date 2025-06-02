import { Miniver, Red_Hat_Display } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";
import 'react-perfect-scrollbar/dist/css/styles.css';
import AuthSessionProvider from "@/authentication/AuthSession";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from "@/ui-components/sidebar";
import { SessionProvider } from "@/context/Session";
import { QueryProvider } from "@/config/api-query";

const MiniverFont = Miniver({
   subsets: ["latin"],
   display: "swap",
   variable: "--miniver-font",
   weight: "400",
})

const redHatDisplay = Red_Hat_Display({
   subsets: ["latin"],
   display: "swap",
   weight: ["400", "500", "600", "700", "800", "900"],
   variable: "--red-hat-display-font",
})

export const metadata = {
   title: "Flavour Haven",
   description: "Flavour haven, the most popular restaurant in the world"
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className={`${MiniverFont.variable} ${redHatDisplay.variable}`}>
            <QueryProvider>
               <SessionProvider>
                  <ThemeProvider>
                     {/* <AuthSessionProvider> */}
                     <QueryProvider>
                        {children}
                     </QueryProvider>
                     {/* </AuthSessionProvider> */}
                  </ThemeProvider>
               </SessionProvider>
            </QueryProvider>
            <Toaster richColors />
         </body>
      </html>
   );
}
