import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				'max-h-logo-main-first': {'raw': '(max-height: 680px)'},
				'max-h-logo-main-second': {'raw': '(max-height: 570px)'},
				'max-h-logo-register-first': {'raw': '(max-height: 760px)'},
				'max-h-logo-register-second': {'raw': '(max-height: 680px)'},
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				/* EVENT COLOR PALETTES */
				'vibezgreen': {
					'50': '#f5ffe4',
					'100': '#e7ffc4',
					'200': '#cfff90',
					'300': '#adff50',
					'400': '#90ff23', /* Main Color */
					'500': '#6ce600',
					'600': '#52b800',
					'700': '#3d8b00',
					'800': '#336d07',
					'900': '#2d5c0b',
					'950': '#133400',
				},
				'vibezpink': {
					'50': '#fff2fd',
					'100': '#ffe3fe',
					'200': '#ffc6fc',
					'300': '#ff99f5',
					'400': '#ff5ded',
					'500': '#ff21ef',
					'600': '#ff01fc', /* Main Color */
					'700': '#cf00c8',
					'800': '#a900a1',
					'900': '#890680',
					'950': '#5e0059',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontSize: {
				clamp: 'clamp(1rem, 5vw, 3rem)'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
