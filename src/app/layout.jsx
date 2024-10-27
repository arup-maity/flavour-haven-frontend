import { Roboto, Miniver } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";
import QueryProvider from "@/components/provider/QueryProvider";
import AuthSessionProvider from "@/authentication/AuthSession";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from "@/ui-components/sidebar";
import { SessionProvider } from "@/context/Session";

const roboto = Roboto({
   weight: "400",
   subsets: ["latin"]
});
const MiniverFont = Miniver({
   subsets: ["latin"],
   display: "swap",
   variable: "--miniver-font",
   weight: "400",
})

export const metadata = {
   title: "Flavour Haven",
   description: "Flavour haven, the most popular restaurant in the world"
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className={`${roboto.className}  ${MiniverFont.variable}`}>
            <SessionProvider>
               <ThemeProvider>
                  <AuthSessionProvider>
                     <QueryProvider>
                        {children}
                     </QueryProvider>
                  </AuthSessionProvider>
               </ThemeProvider>
            </SessionProvider>
            <Toaster richColors />
         </body>
      </html>
   );
}
