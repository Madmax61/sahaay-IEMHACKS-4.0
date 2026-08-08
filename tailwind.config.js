module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#10231d',
        muted: '#6f8179',
        paper: '#f6f8f5',
        sage: '#e6efe8',
        leaf: '#1d7a4d',
        leafDark: '#125a37',
        lime: '#dff3e5'
      },
      boxShadow: {
        soft: '0 14px 45px rgba(16,35,29,.08)'
      }
    }
  },
  plugins: []
};
