/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        zakitos: {
          red: '#E8170B',
          ember: '#FF5500',
          orange: '#FF6B00',
          gold: '#FFB800',
          yellow: '#FFE135',
          black: '#FAFAF8',
          dark: '#F2EBE0',
          card: '#FFFFFF',
          border: '#E3D9CC',
          cream: '#1A1410',
          warm: '#3D3530',
          muted: 'rgba(26, 20, 16, 0.45)',
        },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
      },
      backgroundImage: {
        'fire-gradient': 'linear-gradient(135deg, #E8170B 0%, #FF5500 50%, #FFB800 100%)',
        'dark-gradient': 'linear-gradient(180deg, #FAFAF8 0%, #F2EBE0 100%)',
        'ember-glow': 'radial-gradient(ellipse at center, rgba(255,85,0,0.15) 0%, transparent 70%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'marquee': {
          '0%': {transform: 'translateX(0%)'},
          '100%': {transform: 'translateX(-50%)'},
        },
        'flame-flicker': {
          '0%, 100%': {opacity: '1', transform: 'scaleY(1)'},
          '50%': {opacity: '0.8', transform: 'scaleY(0.95)'},
        },
        'heat-pulse': {
          '0%, 100%': {boxShadow: '0 0 0 0 rgba(232, 23, 11, 0.4)'},
          '50%': {boxShadow: '0 0 20px 8px rgba(232, 23, 11, 0.2)'},
        },
        'slide-up': {
          '0%': {transform: 'translateY(20px)', opacity: '0'},
          '100%': {transform: 'translateY(0)', opacity: '1'},
        },
        'fade-in': {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
        'slide-in-right': {
          '0%': {transform: 'translateX(40px)', opacity: '0'},
          '100%': {transform: 'translateX(0)', opacity: '1'},
        },
        'ember-rise': {
          '0%': {transform: 'translateY(0) scale(1)', opacity: '1'},
          '100%': {transform: 'translateY(-100px) scale(0)', opacity: '0'},
        },
        'glow': {
          '0%, 100%': {textShadow: '0 0 20px rgba(255,85,0,0.5)'},
          '50%': {textShadow: '0 0 40px rgba(255,85,0,0.9), 0 0 80px rgba(255,85,0,0.3)'},
        },
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
        'marquee-fast': 'marquee 12s linear infinite',
        'flame': 'flame-flicker 2s ease-in-out infinite',
        'heat-pulse': 'heat-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'glow': 'glow 3s ease-in-out infinite',
      },
      boxShadow: {
        'fire': '0 0 30px rgba(232, 23, 11, 0.4), 0 0 60px rgba(255, 85, 0, 0.2)',
        'ember': '0 0 20px rgba(255, 85, 0, 0.3)',
        'gold': '0 0 20px rgba(255, 184, 0, 0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.5)',
      },
      clipPath: {
        'diagonal': 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
        'diagonal-rev': 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)',
        'skew': 'polygon(0 0, 100% 5%, 100% 100%, 0 95%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
