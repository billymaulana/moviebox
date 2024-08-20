import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['container-fluid', 'max-w-[100%]'],
    ['row', 'flex flex-wrap'],
    ['col-auto', 'flex-[0_0_auto] w-auto'],
    ['col-1', 'flex-[0_0_auto] w-[8.3333333333%]'],
    ['col-2', 'flex-[0_0_auto] w-[16.6666666667%]'],
    ['col-3', 'flex-[0_0_auto] w-[25%]'],
    ['col-4', 'flex-[0_0_auto] w-[33.3333333333%]'],
    ['col-5', 'flex-[0_0_auto] w-[41.6666666667%]'],
    ['col-6', 'flex-[0_0_auto] w-[50%]'],
    ['col-7', 'flex-[0_0_auto] w-[58.3333333333%]'],
    ['col-8', 'flex-[0_0_auto] w-[66.6666666667%]'],
    ['col-9', 'flex-[0_0_auto] w-[75%]'],
    ['col-10', 'flex-[0_0_auto] w-[83.3333333333%]'],
    ['col-11', 'flex-[0_0_auto] w-[91.6666666667%]'],
    ['col-12', 'flex-[0_0_auto] w-[100%]'],
    ['h-stack', 'flex items-center justify-center min-h-screen'],
    ['btn-primary', 'bg-red-700 text-sm font-bold leading-6 text-white gap-2 py-1.5 px-4 flex items-center rounded-md'],
  ],
  rules: [
    [/^f-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })],
  ],
  presets: [
    presetAttributify(),
    presetUno(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
      },
    }),
  ],
  theme: {
    colors: {
      'red-900': '#7F1D1D',
      'red-800': '#991B1B',
      'red-700': '#B91C1C',
      'red-600': '#DC2626',
      'red-500': '#EF4444',
      'red-400': '#F87171',
      'red-300': '#FCA5A5',
      'red-200': '#FECACA',
      'red-100': '#FEE2E2',
      'red-50': '#FEF2F2',
    },
    container: {
      center: true,
    },
    breakpoints: {
      'xs': '1px',
      'sm': '320px',
      'md': '768px',
      'lg': '996px',
      'xl': '1250px',
      '2xl': '1536px',
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

})
