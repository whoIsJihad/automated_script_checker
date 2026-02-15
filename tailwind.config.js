/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          600: '#dc2626',
          700: '#b91c1c',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          600: '#16a34a',
          700: '#15803d',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          600: '#d97706',
          700: '#b45309',
        },
        emerald: {
          600: '#059669',
        },
      },
    },
  },
  safelist: [
    // All bg colors
    'bg-white', 'bg-slate-50', 'bg-slate-100', 'bg-slate-300', 'bg-indigo-50', 'bg-indigo-100', 'bg-indigo-500', 'bg-indigo-600',
    'bg-red-50', 'bg-green-50', 'bg-amber-50', 'bg-emerald-50', 'bg-blue-50', 'bg-purple-50',
    // All text colors
    'text-slate-700', 'text-slate-600', 'text-slate-900', 'text-indigo-600', 'text-indigo-700', 'text-white',
    'text-red-700', 'text-green-700', 'text-amber-700',
    // All border colors
    'border-slate-200', 'border-indigo-100', 'border-indigo-200', 'border-red-200', 'border-slate-300',
    // Common utilities
    'rounded-xl', 'rounded-lg', 'rounded-full', 'shadow-sm', 'shadow-md', 'shadow-lg',
    'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-8',
    'px-3', 'px-4', 'px-11', 'py-1', 'py-2', 'py-3',
    'h-11', 'h-10', 'h-20', 'h-6', 'w-full', 'w-80',
    'flex', 'grid', 'items-center', 'justify-between', 'space-y-4', 'space-y-5', 'space-y-6', 'gap-3', 'gap-4', 'gap-6',
    'hover:shadow-md', 'hover:border-indigo-500', 'hover:bg-indigo-50', 'hover:-translate-y-0.5',
    'focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-500', 'focus:bg-white',
    'transition-all', 'duration-200', 'ease-in-out',
    'font-semibold', 'font-medium', 'font-bold', 'text-sm', 'text-xs', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl',
  ],
  plugins: [],
}