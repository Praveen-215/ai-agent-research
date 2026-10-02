export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
        foreground: '#171717',
        card: '#FFFFFF',
        border: '#E5E5E5',
        primary: '#171717',
        primaryForeground: '#FFFFFF',
        accent: '#4F46E5', // subtle indigo for primary actions
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
