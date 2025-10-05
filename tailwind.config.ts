import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', 'class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'math-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  			'success-gradient': 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
  			'error-gradient': 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
  			'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'2xl': '1rem',
  			'3xl': '1.5rem',
  			'4xl': '2rem'
  		},
  		animation: {
  			'bounce-gentle': 'bounce-gentle 2s infinite',
  			'wiggle': 'wiggle 0.5s ease-in-out',
  			'celebration': 'celebration 0.6s ease-out',
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'float': 'float 3s ease-in-out infinite',
  			'glow': 'glow 2s ease-in-out infinite alternate',
  			'slide-up': 'slideUp 0.4s ease-out',
  			'slide-down': 'slideDown 0.4s ease-out',
  			'scale-in': 'scaleIn 0.3s ease-out',
  			'gradient-x': 'gradient-x 15s ease infinite',
  			'shimmer': 'shimmer 2s linear infinite'
  		},
  		keyframes: {
  			'bounce-gentle': {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-5px)' }
  			},
  			'wiggle': {
  				'0%, 100%': { transform: 'rotate(0deg)' },
  				'25%': { transform: 'rotate(-2deg)' },
  				'75%': { transform: 'rotate(2deg)' }
  			},
  			'celebration': {
  				'0%': { transform: 'scale(1)' },
  				'50%': { transform: 'scale(1.1) rotate(5deg)' },
  				'100%': { transform: 'scale(1)' }
  			},
  			'float': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-10px)' }
  			},
  			'glow': {
  				'from': { 
  					'box-shadow': '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)' 
  				},
  				'to': { 
  					'box-shadow': '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.2)' 
  				}
  			},
  			'slideUp': {
  				'from': {
  					'opacity': '0',
  					'transform': 'translateY(20px)'
  				},
  				'to': {
  					'opacity': '1',
  					'transform': 'translateY(0)'
  				}
  			},
  			'slideDown': {
  				'from': {
  					'opacity': '0',
  					'transform': 'translateY(-20px)'
  				},
  				'to': {
  					'opacity': '1',
  					'transform': 'translateY(0)'
  				}
  			},
  			'scaleIn': {
  				'from': {
  					'opacity': '0',
  					'transform': 'scale(0.9)'
  				},
  				'to': {
  					'opacity': '1',
  					'transform': 'scale(1)'
  				}
  			},
  			'gradient-x': {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			'shimmer': {
  				'0%': {
  					'background-position': '-200% 0'
  				},
  				'100%': {
  					'background-position': '200% 0'
  				}
  			}
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
  			glass: {
  				light: 'rgba(255, 255, 255, 0.1)',
  				dark: 'rgba(0, 0, 0, 0.1)'
  			}
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		boxShadow: {
  			'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
  			'glow-lg': '0 0 40px rgba(139, 92, 246, 0.4)',
  			'inner-glow': 'inset 0 0 20px rgba(139, 92, 246, 0.1)',
  			'math': '0 8px 32px rgba(139, 92, 246, 0.12)',
  			'success': '0 8px 32px rgba(34, 197, 94, 0.12)',
  			'error': '0 8px 32px rgba(239, 68, 68, 0.12)'
  		},
  		fontFamily: {
  			mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace']
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'112': '28rem',
  			'128': '32rem'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config