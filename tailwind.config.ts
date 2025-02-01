import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'hsl(var(--primary-hover))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          hover: 'hsl(var(--accent-hover))',
          secondary: 'hsl(var(--accent-secondary))',
          'hover-secondary': 'hsl(var(--accent-hover-secondary))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          hover: 'hsl(var(--destructive-hover))',
        },
        border: 'hsl(var(--border))',
        input: {
          DEFAULT: 'hsl(var(--input))',
          foreground: 'hsl(var(--input-foreground))',
        },
        ring: 'hsl(var(--ring))',
        'check-box-foreground': 'hsl(var(--check-box-foreground))',
        placeholder: 'hsl(var(--placeholder))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        shadow: 'hsl(var(--shadow))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        'heading-xl': ['24px', { lineHeight: '30px', fontWeight: '700' }],
        'heading-l': ['18px', { lineHeight: '23px', fontWeight: '700' }],
        'heading-m': ['15px', { lineHeight: '19px', fontWeight: '700' }],
        'heading-s': ['12px', { lineHeight: '15px', fontWeight: '700', letterSpacing: '2.4px' }],
        'body-l': ['13px', { lineHeight: '23px', fontWeight: '500' }],
        'body-m': ['12px', { lineHeight: '15px', fontWeight: '700' }],
      },
      boxShadow: {
        custom: '0px 4px 6px 0px hsla(var(--shadow))'
      }
    },
  },
  // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
