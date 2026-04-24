/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink:    { DEFAULT:'#0a0806', 2:'#100c08', 3:'#1a140d' },
        vellum: { DEFAULT:'#f3ead6', dim:'#d8cdb3', mute:'#8a7e62' },
        gold:   { DEFAULT:'#e4b04a', lit:'#f6d57a', deep:'#9a6e1f' },
        sindoor:{ DEFAULT:'#c0352a', deep:'#7b1d1a' },
        ember:  { DEFAULT:'#ff7a2e' },
        sanctum:{ black:'#0a0806', darker:'#100c08', dark:'#1a140d', burgundy:'#7b1d1a', gold:'#e4b04a', cream:'#f3ead6', 'cream-dark':'#d8cdb3' }
      },
      fontFamily: {
        display: ['"Cinzel"','serif'],
        body:    ['"Cormorant Garamond"','serif'],
        mono:    ['"JetBrains Mono"','monospace'],
        sans:    ['"Cormorant Garamond"','serif'],
      },
      animation: {
        'float':     'float 8s ease-in-out infinite',
        'pulse-slow':'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 160s linear infinite',
        'spin-rev':  'spinRev 260s linear infinite',
        'drop':      'drop 2.4s ease-in-out infinite',
        'marquee':   'marquee 50s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        float:    {'0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-6px)'}},
        spinRev:  {to:{transform:'rotate(-360deg)'}},
        drop:     {'0%':{transform:'scaleY(0)',transformOrigin:'top'},'50%':{transform:'scaleY(1)',transformOrigin:'top'},'51%':{transform:'scaleY(1)',transformOrigin:'bottom'},'100%':{transform:'scaleY(0)',transformOrigin:'bottom'}},
        marquee:  {to:{transform:'translateX(-50%)'}},
        pulseDot: {'0%,100%':{opacity:.5},'50%':{opacity:1}},
      },
    },
  },
  plugins: [],
}
