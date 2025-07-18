import type { Config } from "tailwindcss";

const config: Config = {
   darkMode: ["class"],
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/ui-components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         fontFamily: {
            miniver: ['var(--miniver-font)'],
            redHat: ['var(--red-hat-display-font)'],
            raleway: ['var(--raleway-font)']
         },
         borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)'
         },
         colors: {
            'blue-button': '#2C71F6',
            'blue-hover-button': '#31458F'
         }
      }
   },
   plugins: [require("tailwindcss-animate")],
};
export default config;
