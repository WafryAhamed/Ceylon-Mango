export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        mango: {
          yellow: '#EFB806',
          golden: '#E69D03',
          deep: '#D37E05',
        },
        leaf: {
          green: '#3B653D',
        },
        dark: {
          bg: '#1A1A1A',
          card: '#222222',
          surface: '#2A2A2A',
          border: '#333333',
        },
        light: {
          text: '#F5F5F5',
          muted: '#AAAAAA',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(-2deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(239, 184, 6, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(239, 184, 6, 0.6)' },
        },
      },
    },
  },
}
