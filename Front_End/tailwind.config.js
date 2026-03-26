
module.exports = {
  // ...existing code...
  theme: {
    extend: {
      // ...existing code...
      animation: {
        // ...existing code...
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 45s linear infinite',
      },
      keyframes: {
        // ...existing code...
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  // ...existing code...
};