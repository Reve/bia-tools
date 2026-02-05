/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Base Neutrals
        ink: '#0F172A',
        slate: '#334155',
        mist: '#E2E8F0',
        paper: '#F8FAFC',
        // Accent Colors
        cobalt: '#2563EB',
        emerald: '#10B981',
        amber: '#F59E0B',
        rose: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'content': '960px',
      },
      boxShadow: {
        'card': '0 8px 24px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [],
}
