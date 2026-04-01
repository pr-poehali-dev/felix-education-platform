import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				nunito: ['Nunito', 'Comic Sans MS', 'cursive', 'sans-serif'],
				fredoka: ['Fredoka One', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Game-specific colors
				teal: {
					light: '#7FE0DA',
					DEFAULT: '#2DC4BA',
					dark: '#1A9990',
				},
				gold: {
					light: '#FFE566',
					DEFAULT: '#FFD700',
					dark: '#E6B800',
				},
				coral: {
					light: '#FF9F8E',
					DEFAULT: '#FF6B5B',
					dark: '#E64A3A',
				},
				purple: {
					light: '#C9A8FF',
					DEFAULT: '#9B6DFF',
					dark: '#7040E6',
				},
				green: {
					light: '#7FE8A0',
					DEFAULT: '#3DCC6A',
					dark: '#2BAA54',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'bounce-soft': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'pop-in': {
					'0%': { transform: 'scale(0.5)', opacity: '0' },
					'70%': { transform: 'scale(1.1)' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'sparkle': {
					'0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
					'50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' }
				},
				'slide-up': {
					from: { transform: 'translateY(30px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'fade-in-scale': {
					from: { transform: 'scale(0.8)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				},
				'felix-wave-arm': {
					'0%': { transform: 'rotate(-15deg) translateY(0px)' },
					'50%': { transform: 'rotate(25deg) translateY(-6px)' },
					'100%': { transform: 'rotate(-15deg) translateY(0px)' }
				},
				'speech-pop': {
					'0%': { transform: 'scale(0.5) translateY(10px)', opacity: '0' },
					'70%': { transform: 'scale(1.05) translateY(-2px)', opacity: '1' },
					'100%': { transform: 'scale(1) translateY(0)', opacity: '1' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce-soft': 'bounce-soft 2.5s ease-in-out infinite',
				'wiggle': 'wiggle 2s ease-in-out infinite',
				'pop-in': 'pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
				'float': 'float 3s ease-in-out infinite',
				'float-delay': 'float 3s ease-in-out 0.5s infinite',
				'float-delay2': 'float 3s ease-in-out 1s infinite',
				'sparkle': 'sparkle 2s ease-in-out infinite',
				'sparkle-delay': 'sparkle 2s ease-in-out 0.7s infinite',
				'sparkle-delay2': 'sparkle 2s ease-in-out 1.4s infinite',
				'slide-up': 'slide-up 0.5s ease-out forwards',
				'fade-in-scale': 'fade-in-scale 0.4s ease-out forwards',
				'felix-wave-arm': 'felix-wave-arm 0.5s ease-in-out infinite',
				'speech-pop': 'speech-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
