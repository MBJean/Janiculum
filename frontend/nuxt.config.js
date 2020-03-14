
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Chivo:400,700|Lato:400,700,900&display=swap' },
      { rel: 'apple-touch-icon', href: '57x57', sizes: '/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', href: '60x60', sizes: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', href: '72x72', sizes: '/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', href: '76x76', sizes: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', href: '114x114', sizes: '/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', href: '120x120', sizes: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', href: '144x144', sizes: '/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', href: '152x152', sizes: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', href: '180x180', sizes: '/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', href: '192x192', sizes: '/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', href: '32x32', sizes: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', href: '96x96', sizes: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', href: '16x16', sizes: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/index.scss'
  ],
  styleResources:  {
    scss: [
      '~/assets/scss/variables.scss'
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    ['@nuxtjs/apollo'],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  apollo: {
    tokenName: 'yourApolloTokenName', // optional, default: apollo-token
    cookieAttributes: {
      /**
        * Define when the cookie will be removed. Value can be a Number
        * which will be interpreted as days from time of creation or a
        * Date instance. If omitted, the cookie becomes a session cookie.
        */
      expires: 7, // optional, default: 7 (days)

      /**
        * Define the path where the cookie is available. Defaults to '/'
        */
      path: '/', // optional
      /**
        * Define the domain where the cookie is available. Defaults to
        * the domain of the page where the cookie was created.
        */
      domain: 'example.com', // optional

      /**
        * A Boolean indicating if the cookie transmission requires a
        * secure protocol (https). Defaults to false.
        */
      secure: false,
    },
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Basic', // optional, default: 'Bearer'
    // (Optional) Default 'apollo' definition
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    // required
    clientConfigs: {
      default: {
        // required
        httpEndpoint: process.env.NODE_ENV === 'production' ? '/graphql' : 'http://localhost:8000/graphql',
        // optional
        // See https://www.apollographql.com/docs/link/links/http.html#options
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        wsEndpoint: null, // optional
        // LocalStorage token
        tokenName: 'apollo-token', // optional
        // Enable Automatic Query persisting with Apollo Engine
        persisting: false, // Optional
        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        websocketsOnly: false // Optional
      },
    }
  },
  /*
  ** Generate configuration
  */
  generate: {
    dir: '../public'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
