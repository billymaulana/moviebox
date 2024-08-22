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
    ['flex-0-auto', 'flex-[0_0_auto]'],
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
    ['v-separator-l', 'pl-[20px] border-l-[1px] border-solid border-gray-500'],
    ['h-stack', 'flex items-center justify-center min-h-screen'],
    ['btn-primary', 'bg-red-700 text-sm font-bold leading-6 text-white gap-2 py-1.5 px-4 flex items-center rounded-md hover:bg-red-600 transition-all'],
  ],
  rules: [
    [/^f-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })],
    [/^lh-(\d+)$/, ([, d]) => ({ 'line-height': `${d}px` })],
    [/^ls-(\d+)$/, ([, d]) => ({ 'letter-spacing': `${d}px` })],
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
      // red
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

      // roses
      'rose-900': '#881337',
      'rose-800': '#9F1239',
      'rose-700': '#BE123C',
      'rose-600': '#E11D48',
      'rose-500': '#F43F5E',
      'rose-400': '#FB7185',
      'rose-300': '#FDA4AF',
      'rose-200': '#FECDD3',
      'rose-100': '#FFE4E6',
      'rose-50': '#FFF1F2',

      // gray
      'gray-900': '#111827',
      'gray-800': '#1F2937',
      'gray-700': '#374151',
      'gray-600': '#4B5563',
      'gray-500': '#6B7280',
      'gray-400': '#9CA3AF',
      'gray-300': '#D1D5DB',
      'gray-200': '#E5E7EB',
      'gray-100': '#F3F4F6',
      'gray-50': '#F9FAFB',
    },
    container: {
      center: true,
    },
    breakpoints: {
      'xs': '1px',
      'sm': '320px',
      'md': '768px',
      'lg': '996px',
      'xl': '1300px',
      '2xl': '1536px',
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

})
