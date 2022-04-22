const appTitle = '流し動画'
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  server: {
    port: process.env.PORT,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: appTitle,
    script: [
      {
        innerHTML: `
        if (('standalone' in navigator) && (!navigator.standalone)) {
          import('https://unpkg.com/pwacompat');
        }
        `,
      },
    ],
    __dangerouslyDisableSanitizers: ['script'],
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      { name: 'apple-mobile-web-app-title', content: appTitle },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css',
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui', '@/plugins/services'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['nuxt-vite'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://composition-api.nuxtjs.org
    '@nuxtjs/composition-api/module',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      mobileApp: true,
      mobileAppIOS: false,
      appleStatusBarStyle: 'default',
      nativeUI: true,
      name: appTitle,
      title: appTitle,
      'og:title': appTitle,
      description: appTitle,
      'og:description': appTitle,
      lang: 'ja',
      display: 'standalone',
      scope: '/',
      start_url: '/',
    },
    manifest: {
      name: appTitle,
      short_name: appTitle,
      orientation: 'portrait',
      theme_color: '#FF0000', // 起動時のスプラッシュ画面の背景色
      background_color: '#FF0000', // 画面の上にあるステータスバーの色
      lang: 'ja',
    },
    workbox: {
      enabled: false,
      dev: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        port: process.env.WS_PORT,
      },
    },
  },

  publicRuntimeConfig: {
    API_KEY: process.env.API_KEY,
    BASE_URL: process.env.BASE_URL,
    OFFLINE_PORT: process.env.OFFLINE_PORT,
    // axios: {
    //   browserBaseURL: process.env.BROWSER_BASE_URL,
    // },
  },
}
