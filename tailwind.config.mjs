/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
  theme: {
    extend: {
      colors: {
        cream:   'var(--cream)',
        cream2:  'var(--cream2)',
        cream3:  'var(--cream3)',
        parchment: 'var(--parchment)',
        mocha:   'var(--mocha)',
        mocha2:  'var(--mocha2)',
        gold:    'var(--gold)',
        gold2:   'var(--gold2)',
        sand:    'var(--sand)',
        white:   'var(--white)',
        'text-body':  'var(--text-body)',
        'text-light': 'var(--text-light)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'EB Garamond', 'Georgia', 'serif'],
        sans:  ['Jost', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
